import json
from typing import Any

def exclude_random_tld(tld) -> Any:
    to_exclude = set(["windows.net", "cloudflarestorage.com", ".clients6.google.com", "awswaf.com", "digicert.com", "gstatic.com"])
    if any(substring in tld for substring in to_exclude):
        return True
    else:
        return False

def json_to_packets_dict(json_data: str) -> Any:
    packets_dict = {}
    for packet in json_data:
        if not exclude_random_tld(packet["destination_hostname"]):
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
# def json_to_time_data(json_data: str) -> Any:

