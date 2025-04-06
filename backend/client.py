import requests
from scapy.all import sniff
import json
import time
from collections import deque
import ipaddress
import socket
from datetime import datetime

# URL of your Flask backend API
API_URL = "http://127.0.0.1:5000/pcap"

# Configurable parameters for batching
BATCH_SIZE = 300  # Number of packets in each batch
BATCH_INTERVAL = 10  # Maximum time interval in seconds for each batch

# To hold the batch of packets
packet_batch = deque()

# Cache for reverse DNS lookups (using a dictionary)
reverse_dns_cache = {}

def is_private_ip(ip):
    """
    Check if the given IP address is in a private range.
    """
    try:
        ip_obj = ipaddress.ip_address(ip)
        # Check if the IP address is in any of the private address ranges
        return ip_obj.is_private
    except ValueError:
        return False

def send_batch_to_api(batch):
    """
    Sends a batch of packet data to the backend API.
    """
    if len(batch) > 0:
        response = requests.post(API_URL, json=batch)
        
        if response.status_code == 200:
            print(f"Batch sent successfully with {len(batch)} packets")
        else:
            print(f"Failed to send batch. Status code: {response.status_code}")

def process_packet(packet):
    """
    Processes a single packet and adds it to the batch.
    If the batch reaches the BATCH_SIZE or BATCH_INTERVAL, send the batch to the backend.
    """
    global packet_batch

    source_ip = packet[1].src
    destination_ip = packet[1].dst
    dt_object = datetime.fromtimestamp(packet.time)
    # formatted_timestamp = dt_object.strftime('%Y-%m-%dT%H:%M:%S.') + f"{:06d}"

    if not is_private_ip(destination_ip):
        # Perform reverse DNS lookup for destination IP
        
        # Collect packet info
        packet_info = {
            'time': packet.time,
            'source_ip': source_ip,
            'destination_ip': destination_ip,
        }
        
        # Add the packet info to the batch
        packet_batch.append(packet_info)

    # Check if the batch has reached the desired size or interval
    if len(packet_batch) >= BATCH_SIZE:
        send_batch_to_api(list(packet_batch))
        packet_batch.clear()  # Clear the batch after sending

def capture_packets():
    """
    Captures network packets and processes them in batches.
    """
    start_time = time.time()
    
    print(f"Starting packet capture... (Batches sent every {BATCH_INTERVAL} seconds or {BATCH_SIZE} packets)")

    while True:
        sniff(prn=process_packet, store=0)  # Process each packet with process_packet()

        # Check if it's time to send the batch based on the time interval
        if time.time() - start_time >= BATCH_INTERVAL:
            if len(packet_batch) > 0:
                send_batch_to_api(list(packet_batch))
                packet_batch.clear()  # Clear the batch after sending
            start_time = time.time()  # Reset the timer for the next batch

if __name__ == "__main__":
    capture_packets()
