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
    return distractor_packets

def get_overall_traffic() -> Any:
    conn = get_db_connection()
    rows = conn.execute("SELECT COUNT(id), destination_name from traffic GROUP BY destination_name ORDER BY COUNT(id) DESC").fetchall()
    packets_dict = []
    for row in rows:
        packets_dict.append((row[1], row[0]))

    return packets_dict

'''
take last 10 minutes
find top 3 most visited domains
for each
{ time: "21:35", google.com: 385, chatgpt.com: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 }
'''
def json_to_time_data():
    conn = get_db_connection()
    output = []
    for i in range(0,10):
        rows = conn.execute(f"""SELECT MIN(time) as first_seen, destination_ip, destination_name, COUNT(*) as count
                                FROM traffic
                                WHERE time >= (strftime('%s', 'now') - {60 * (i+1)}) AND time <= (strftime('%s', 'now') - {60 * i})
                                GROUP BY destination_ip
                                ORDER BY count DESC
                                LIMIT 3;""").fetchall()
        for (first_seen, destination_ip, destination_name, count) in rows:
            first_time = datetime.fromtimestamp(first_seen).strftime('%H:%M')
            output.append({
                "date": first_time,
                destination_ip if destination_name == '' else  destination_name: count,
            })
        print(output)

    return output
        

    # for (destination_ip, count) in rows:
    #     print(f"{destination_ip}: {count} occurrences")

    
    

    






