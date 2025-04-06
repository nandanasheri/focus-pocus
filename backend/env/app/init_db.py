import sqlite3

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

cursor.execute('''CREATE TABLE IF NOT EXISTS traffic (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    time DATETIME,
                    src_ip VARCHAR(50),
                    destination_ip VARCHAR(50),
                    destination_name VARCHAR(100))''')

# Close the connection
conn.close()
