import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import get_overall_traffic, json_to_time_data, distracting_sites_count, get_sourceip_packets

app = Flask(__name__)

# To allow CORS from our frontend .
CORS(app)

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
        # iterate over the list of JSON objects to a JSON string and then to bytes
        for row in data:
            conn.execute('INSERT INTO traffic (time, src_ip, destination_ip, destination_name) VALUES (?, ?, ?, ?) ', (row['time'], row['source_ip'], row['destination_ip'], ''))

        conn.commit()

    return jsonify({"message": f"Received data"}), 200

@app.route('/activity', methods=['GET'])
def get_activity():
    
    packets = get_overall_traffic()
    time = json_to_time_data()
    number, alerts = distracting_sites_count()
    source_ip = get_sourceip_packets()

    # Return a JSON response
    return {"traffic" : packets, "sources" : source_ip, "time" : time, "number": number, "alerts": alerts}

@app.route('/')
def hello():
    return 'Hello World!'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)