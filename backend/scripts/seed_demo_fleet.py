import mysql.connector
import time
import random

conn = mysql.connector.connect(
    unix_socket="/run/mysqld/mysqld.sock",
    user="root",
    database="udaan_ai",
)
cur = conn.cursor()

# Base coordinates around Indira Gandhi Intl Airport, Delhi
BASE_LAT, BASE_LNG = 28.5562, 77.1000

fleet = [
    ("AS-101", "car", "Active", 245, 8200, "Delhi Airspace Sector 1"),
    ("AS-102", "car", "Active", 310, 11000, "Mumbai Coastal Corridor"),
    ("AS-103", "truck", "Active", 180, 1500, "Bangalore Urban Grid"),
    ("AS-104", "truck", "Active", 95, 900, "Chennai Port Perimeter"),
    ("AS-105", "excavator", "Active", 42, 120, "Hyderabad Survey Zone"),
    ("AS-106", "excavator", "Active", 38, 95, "Pune Industrial Corridor"),
    ("AS-107", "car", "No Update", 0, 9800, "Kolkata Transit Route"),
    ("AS-108", "truck", "No Update", 0, 700, "Ahmedabad Logistics Hub"),
]

now = int(time.time())

for idx, (vnum, vtype, status, speed, alt, address) in enumerate(fleet):
    cur.execute(
        "SELECT id FROM entity WHERE vehicle_number=%s", (vnum,)
    )
    row = cur.fetchone()
    if not row:
        cur.execute(
            "INSERT INTO entity (vehicle_number, type, status) VALUES (%s, %s, 1)",
            (vnum, vtype),
        )

    lat = BASE_LAT + random.uniform(-2.5, 2.5)
    lng = BASE_LNG + random.uniform(-3.5, 3.5)
    ts = now if status == "Active" else now - (5 * 3600)

    cur.execute(
        """INSERT INTO gps_schema
        (GPSVendor, deviceId, trailerNumber, timestamp, gpstimestamp, gprstimestamp,
         address, latitude, longitude, heading, speed, numberOfSatellites, power)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
        (
            "AirSync-GPS",
            f"DEV-{1000+idx}",
            vnum,
            ts,
            ts,
            ts,
            address,
            lat,
            lng,
            random.randint(0, 359),
            speed,
            str(random.randint(6, 12)),
            "ON",
        ),
    )

conn.commit()
cur.close()
conn.close()
print("Seeded fleet + gps data successfully")
