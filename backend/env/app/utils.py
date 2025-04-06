import json
from typing import Any

def json_to_packets_dict(json_data: str) -> Any:
    packets_dict = {}
    for packet in json_data:
        if packet["destination_hostname"] not in packets_dict:
            packets_dict[packet["destination_hostname"]] = 1
        else:
            packets_dict[packet["destination_hostname"]] += 1

    return packets_dict

