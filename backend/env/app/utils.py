from typing import Any
from datetime import datetime, timedelta
from collections import defaultdict

import sqlite3

DISTRACTORS = set([
    "linkedin",
    "tiktok",
    "reddit",
    "facebook",
    "youtube",
    "discord",
    "snapchat",
    "whatsapp",
    "instagram",
    "netflix",
    "amazon",
    "hbo",
    "zara"
])

def get_db_connection():
    conn = sqlite3.connect('database.db')
    # This gives you name-bases access to columns in your database
    conn.row_factory = sqlite3.Row
    return conn

def distracting_sites_count():
    conn = get_db_connection()
    rows = conn.execute("SELECT destination_name FROM traffic").fetchall()
    destination_names = [row[0] for row in rows]
    distractor_packets = 0
    for destination_name in destination_names:
          if any(distractor in destination_name for distractor in DISTRACTORS):
              distractor_packets += 1
    if len(destination_name):
        return distractor_packets/len(destination_name) * 100
    return 0

def get_overall_traffic() -> Any:
    conn = get_db_connection()
    rows = conn.execute("SELECT COUNT(id), destination_name from traffic GROUP BY destination_name ORDER BY COUNT(id) DESC").fetchall()
    packets_dict = []
    for row in rows:
        packets_dict.append((row[1], row[0]))

    return packets_dict

def get_sourceip_packets() -> Any:
    conn = get_db_connection()
    rows = conn.execute("SELECT src_ip, COUNT(id) from traffic GROUP BY src_ip")
    src_data = []
    for row in rows:
        src_data.append((row[0], row[1]))
    return src_data
'''
take last 10 minutes
find top 3 most visited domains
for each
{ date: "21:35", google.com: 385, chatgpt.com: 420 },
{ date: "21:35", google.com: 385, chatgpt.com: 420 },
{ date: "21:35", google.com: 385, chatgpt.com: 420 },
'''
def json_to_time_data():
    conn = get_db_connection()
    output = []
    for i in range(0,60):
        rows = conn.execute(f"""SELECT MIN(time) as first_seen, destination_ip, destination_name, COUNT(*) as count
                                FROM traffic
                                WHERE time >= (strftime('%s', 'now') - {60 * (i+1)}) AND time <= (strftime('%s', 'now') - {60 * i})
                                GROUP BY destination_ip
                                ORDER BY count DESC
                                LIMIT 3;""").fetchall()
        for (first_seen, destination_ip, destination_name, count) in rows:
            first_time = datetime.fromtimestamp(first_seen).strftime('%H:%M')
            output.append({
                "time": first_time,
                "domain" : destination_ip if destination_name == '' else  destination_name,
                "visits": count,
            })

    return output


    
    

    






