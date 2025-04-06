import sqlite3
import json

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

cursor.execute('''CREATE TABLE IF NOT EXISTS traffic (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    data BLOB)''')

file_path = 'output.json'

# Open and read the JSON file
with open(file_path, 'r') as file:
    data = json.load(file)

for each in data:
    json_data = json.dumps(each).encode('utf-8')
    conn.execute('INSERT INTO traffic (data) VALUES (?)', (json_data,))

conn.commit() 

rows = conn.execute('SELECT * FROM traffic').fetchall()

# Close the connection
conn.close()
