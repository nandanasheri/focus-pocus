from flask import Flask, request, jsonify
import sqlite3
import json
from utils import json_to_packets_dict, remove_random_domains, json_to_time_data
app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    # This gives you name-bases access to columns in your database
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/pcap', methods=['POST'])
def submit_data():
    # Get data from the POST request
    data = request.get_json()  
    conn = get_db_connection()
    # Check if data exists
    if not data:
        return jsonify({"error": "No data provided"}), 400
    else:
        # Convert the list of JSON objects to a JSON string and then to bytes
        json_data = json.dumps(data).encode('utf-8')
        for data in json_data:
             conn.execute('INSERT INTO traffic (data) VALUES (?)', (data))

        conn.commit()

    return jsonify({"message": f"Received data"}), 200

@app.route('/activity', methods=['GET'])
def get_activity():
    conn = get_db_connection()
    # Fetch the data back from the database
    rows = conn.execute('SELECT * FROM traffic').fetchall()
    # print(rows)
    response = []
    # Convert the stored BLOB back to a Python list of dictionaries
    for row in rows:
        stored_blob = row[1]  # Assuming 'data' is the second column
        stored_json = stored_blob.decode('utf-8')  # Decode bytes back to string
        stored_data = json.loads(stored_json)

        response.append(stored_data)

    clean_data = remove_random_domains(response)
    packets = json_to_packets_dict(clean_data)

    json_to_time_data(clean_data)
    conn.close()
    # Return a JSON response
    return {"Data" : packets}

@app.route('/')
def hello():
    return 'Hello World!'