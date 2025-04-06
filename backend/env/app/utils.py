from typing import Any
from datetime import datetime, timedelta
from collections import defaultdict

def exclude_random_tld(tld) -> Any:
    to_exclude = set(["windows.net", "cloudflarestorage.com", ".clients6.google.com", "awswaf.com", "digicert.com", "gstatic.com"])
    if any(substring in tld for substring in to_exclude):
        return True
    else:
        return False

def remove_random_domains(json_data: str) -> Any:
    clean_data = []
    for each in json_data:
        if not exclude_random_tld(each["destination_hostname"]):
            clean_data.append(each)
    return clean_data

def json_to_packets_dict(json_data: str) -> Any:
    packets_dict = {}
    for packet in json_data:
        if packet["destination_hostname"] not in packets_dict:
            packets_dict[packet["destination_hostname"]] = 1
        else:
            packets_dict[packet["destination_hostname"]] += 1

    return packets_dict

'''
take last 10 minutes
find top 3 most visited domains
for each
{ time: "21:35", google.com: 385, chatgpt.com: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 }
'''
def json_to_time_data(clean_json: str) -> Any:
    
    # Function to parse ISO date strings
    def parse_time(iso_str):
        return datetime.fromisoformat(iso_str)
    
    latest_time = parse_time(clean_json[-1]['time'])
    ten_minutes_ago = latest_time - timedelta(minutes=10)

    # Filter the data (select entries within the last 10 minutes)
    filtered_data = [entry for entry in clean_json if parse_time(entry["time"]) > ten_minutes_ago]

    domain_count = defaultdict(int)

    for entry in filtered_data:
        domain = entry["destination_hostname"]
        domain_count[domain] += 1

    # Get the top 3 most visited domains overall
    top_domains = sorted(domain_count.items(), key=lambda x: x[1], reverse=True)[:3]

    top_domain_names = []
    for i in top_domains:
        top_domain_names.append(i[0])

    result = {}
    for each in filtered_data:
        timestamp = parse_time(each["time"])
        minute = timestamp.replace(second=0, microsecond=0).strftime("%H:%M")  # Truncate to the minute
        if minute not in result:
            result[minute] = {}
            result[minute][top_domain_names[0]] = 0
            result[minute][top_domain_names[1]] = 0
            result[minute][top_domain_names[2]] = 0

        if each['destination_hostname'] in top_domain_names:
            result[minute][each['destination_hostname']] += 1
    

    






