import sqlite3
import socket
import time

def isvalid_domain(domain):
    RANDOM_DOMAINS = set(['.net', 'aws', 'static', 'cloudflare'])
    if any(domain in each for each in RANDOM_DOMAINS):
        return True
    return False

def get_top_destination_ips_with_empty_destination_name():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # Query to get the top 5 most common destination_ips with an empty destination_name
    cursor.execute("""
        SELECT destination_ip, COUNT(*) as count
        FROM traffic
        WHERE destination_name = ''
        GROUP BY destination_ip
        ORDER BY count DESC
        LIMIT 5
    """)
    rows = cursor.fetchall()
    conn.close()

    return [row[0] for row in rows]

def reverse_dns_lookup(destination_ip):
    try:
        destination_name = socket.gethostbyaddr(destination_ip)[0]
        return destination_name
    except socket.herror:
        return None

def update_destination_name(destination_ip, destination_name):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    cursor.execute("UPDATE traffic SET destination_name = ? WHERE destination_ip = ?", (destination_name, destination_ip))
    
    conn.commit()
    conn.close()

def delete_entry(destination_ip):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    # Delete the entry for the given destination_ip
    cursor.execute("DELETE FROM traffic WHERE destination_ip = ?", (destination_ip,))
    
    conn.commit()
    conn.close()

def main():
    while True:
        top_destination_ips = get_top_destination_ips_with_empty_destination_name()
        
        for destination_ip in top_destination_ips:
            destination_name = reverse_dns_lookup(destination_ip)
            if destination_name:
                if isvalid_domain(destination_name):
                    print(f"Updating {destination_ip} to {destination_name}")
                    update_destination_name(destination_ip, destination_name)
            elif not destination_name or not isvalid_domain(destination_name):
                # If reverse DNS lookup fails, delete the entry
                print(f"Could not resolve {destination_ip}. Deleting entry.")
                delete_entry(destination_ip)
        
        time.sleep(5)

if __name__ == '__main__':
    main()
