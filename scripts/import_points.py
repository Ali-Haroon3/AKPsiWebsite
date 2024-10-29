# scripts/import_points.py
#!/usr/bin/env python3

import csv
import mysql.connector
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Set paths
points_file = os.path.join('data', 'Points  - Total Points.csv')

# Connect to MySQL
db = mysql.connector.connect(
    host=os.getenv("MYSQL_HOST"),
    user=os.getenv("MYSQL_USER"),
    password=os.getenv("MYSQL_PASSWORD"),
    database=os.getenv("MYSQL_DATABASE"),
    port=os.getenv("MYSQL_PORT")
)
cursor = db.cursor()

def process_points():
    try:
        with open(points_file, 'r', encoding='utf-8-sig') as f:
            reader = csv.reader(f)
            headers = next(reader)  # Skip the first two header rows
            headers = next(reader)

            # Identify the start of data
            while True:
                try:
                    first_row = next(reader)
                    if first_row[0].strip().lower() == 'identikey':
                        headers = next(reader)
                        break
                except StopIteration:
                    print("No data found in points CSV.")
                    return

            for row in reader:
                if not row or not row[0].strip():
                    continue  # Skip empty rows

                identikey = row[0].strip()
                if identikey.lower() == 'identikey':
                    continue  # Skip header rows

                # Extract point categories
                try:
                    alumni_tailgate = int(row[1]) if row[1].strip() else 0
                    assisting_with_interviews = int(row[2]) if row[2].strip() else 0
                    big_brother_mentor = int(row[3]) if row[3].strip() else 0
                    brother_interviews = int(row[4]) if row[4].strip() else 0
                    busik_letters = int(row[5]) if row[5].strip() else 0
                    chapter_attendance = int(row[6]) if row[6].strip() else 0
                    committee_cabinet_member = int(row[7]) if row[7].strip() else 0
                    domingos = int(row[8]) if row[8].strip() else 0
                    exec_member = int(row[9]) if row[9].strip() else 0
                    family_hangouts = int(row[10]) if row[10].strip() else 0
                    family_head = int(row[11]) if row[11].strip() else 0
                    forms = int(row[12]) if row[12].strip() else 0
                    missing_late_forms = int(row[13]) if row[13].strip() else 0
                    hosting_family_initiation = int(row[14]) if row[14].strip() else 0
                    hosting_official_initiation = int(row[15]) if row[15].strip() else 0
                    initiation_so_bro = int(row[16]) if row[16].strip() else 0
                    perfect_attendance = int(row[17]) if row[17].strip() else 0
                    perfect_recruitment_attendance = int(row[18]) if row[18].strip() else 0
                    photocircle_upload_10 = int(row[19]) if row[19].strip() else 0
                    posting_on_story = int(row[20]) if row[20].strip() else 0
                    professional_headshot = int(row[21]) if row[21].strip() else 0
                    recruitment_tabling = int(row[22]) if row[22].strip() else 0
                    rush_attendance = int(row[23]) if row[23].strip() else 0
                    rush_event_missed = int(row[24]) if row[24].strip() else 0
                    service_event_attendance = int(row[25]) if row[25].strip() else 0
                    sobro = int(row[26]) if row[26].strip() else 0
                    wellness_week_events = int(row[27]) if row[27].strip() else 0
                    zeta_chats = int(row[28]) if row[28].strip() else 0
                    total = int(row[29]) if row[29].strip() else 0
                except ValueError as ve:
                    print(f"Skipping invalid data for {identikey}: {ve}")
                    continue

                # Prepare SQL for UPDATE
                query = """
                UPDATE users SET
                    alumni_tailgate = %s,
                    assisting_with_interviews = %s,
                    big_brother_mentor = %s,
                    brother_interviews = %s,
                    busik_letters = %s,
                    chapter_attendance = %s,
                    committee_cabinet_member = %s,
                    domingos = %s,
                    exec_member = %s,
                    family_hangouts = %s,
                    family_head = %s,
                    forms = %s,
                    missing_late_forms = %s,
                    hosting_family_initiation = %s,
                    hosting_official_initiation = %s,
                    initiation_so_bro = %s,
                    perfect_attendance = %s,
                    perfect_recruitment_attendance = %s,
                    photocircle_upload_10 = %s,
                    posting_on_story = %s,
                    professional_headshot = %s,
                    recruitment_tabling = %s,
                    rush_attendance = %s,
                    rush_event_missed = %s,
                    service_event_attendance = %s,
                    sobro = %s,
                    wellness_week_events = %s,
                    zeta_chats = %s,
                    total_points = %s
                WHERE identikey = %s
                """
                values = (
                    alumni_tailgate,
                    assisting_with_interviews,
                    big_brother_mentor,
                    brother_interviews,
                    busik_letters,
                    chapter_attendance,
                    committee_cabinet_member,
                    domingos,
                    exec_member,
                    family_hangouts,
                    family_head,
                    forms,
                    missing_late_forms,
                    hosting_family_initiation,
                    hosting_official_initiation,
                    initiation_so_bro,
                    perfect_attendance,
                    perfect_recruitment_attendance,
                    photocircle_upload_10,
                    posting_on_story,
                    professional_headshot,
                    recruitment_tabling,
                    rush_attendance,
                    rush_event_missed,
                    service_event_attendance,
                    sobro,
                    wellness_week_events,
                    zeta_chats,
                    total,
                    identikey
                )

                try:
                    cursor.execute(query, values)
                    print(f"Updated points for user: {identikey}")
                except mysql.connector.Error as err:
                    print(f"Error updating points for {identikey}: {err}")

        db.commit()
        print("Points data imported successfully.")

    except FileNotFoundError:
        print(f"File {points_file} not found.")
    except Exception as e:
        print(f"Error processing points data: {e}")
    finally:
        cursor.close()
        db.close()

if __name__ == "__main__":
    process_points()
