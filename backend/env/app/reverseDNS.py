import sqlite3
import socket
import time

def get_top_host_ips_with_empty_hostname():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # Query to get the top 5 most common host_ips with an empty host_name
    cursor.execute("""
        SELECT host_ips, COUNT(*) as count
        FROM traffic
        WHERE host_name = ''
        GROUP BY host_ips
        ORDER BY count DESC
        LIMIT 5
    """)
    rows = cursor.fetchall()
    conn.close()

    return [row[0] for row in rows]

def reverse_dns_lookup(host_ip):
    try:
        host_name = socket.gethostbyaddr(host_ip)[0]
        return host_name
    except socket.herror:
        return None

def update_host_name(host_ip, host_name):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    cursor.execute("UPDATE traffic SET host_name = ? WHERE host_ips = ?", (host_name, host_ip))
    
    conn.commit()
    conn.close()

def main():
    while True:
        top_host_ips = get_top_host_ips_with_empty_hostname()
        
        for host_ip in top_host_ips:
            host_name = reverse_dns_lookup(host_ip)
            if host_name:
                print(f"Updating {host_ip} to {host_name}")
                update_host_name(host_ip, host_name)
            else:
                print(f"Could not resolve {host_ip}")
        
        time.sleep(5)

if __name__ == '__main__':
    main()