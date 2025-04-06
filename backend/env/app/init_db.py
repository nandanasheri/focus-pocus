import json
import sqlite3

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

cursor.execute('''CREATE TABLE IF NOT EXISTS traffic (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    time DATETIME,
                    src_ip VARCHAR(50),
                    destination_ip VARCHAR(50),
                    destination_name VARCHAR(100))''')

file_path = 'output.json'

# Open and read the JSON file
with open(file_path, 'r') as file:
    data = json.load(file)

for row in data:
    conn.execute('INSERT INTO traffic (time, src_ip, destination_ip, destination_name) VALUES (?, ?, ?, ?) ', (row['time'], row['source_ip'], row['destination_ip'], ''))

conn.commit() 

rows = conn.execute('SELECT * FROM traffic').fetchall()

# Close the connection
conn.close()
