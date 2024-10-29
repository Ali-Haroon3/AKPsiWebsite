# scripts/import_member_status.py

import csv
import mysql.connector
import os
from dotenv import load_dotenv
from datetime import datetime

# Load environment variables from .env
load_dotenv()

# Set paths
member_status_file = os.path.join('data', 'Points - Member Status Form FA24.csv')  # Ensure this is the correct file

# Connect to MySQL
try:
    db = mysql.connector.connect(
        host=os.getenv("MYSQL_HOST"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PASSWORD"),
        database=os.getenv("MYSQL_DATABASE"),
        port=os.getenv("MYSQL_PORT")
    )
    cursor = db.cursor()
except mysql.connector.Error as err:
    print(f"Error connecting to MySQL: {err}")
    exit(1)

def parse_boolean(value):
    """Parse Yes/No to boolean."""
    if isinstance(value, str):
        return True if value.strip().lower() == 'yes' else False
    return False

def parse_date(value):
    """Parse date from M/D/YY or M/D/YYYY to YYYY-MM-DD."""
    if not value:
        return None
    for fmt in ('%m/%d/%y', '%m/%d/%Y'):
        try:
            return datetime.strptime(value.strip(), fmt).strftime('%Y-%m-%d')
        except ValueError:
            continue
    return None

def process_member_status():
    try:
        with open(member_status_file, 'r', encoding='utf-8-sig') as f:
            reader = csv.DictReader(f)
            for row_number, row in enumerate(reader, start=2):  # Start at 2 considering header
                try:
                    identikey_email = row.get('Identikey Email (ex: mabi7864@colorado.edu)', '').strip()
                    if not identikey_email:
                        print(f"Row {row_number}: Missing Identikey Email. Skipping.")
                        continue
                    identikey = identikey_email.split('@')[0] if '@' in identikey_email else identikey_email

                    # Extract required fields with default empty strings
                    legal_name = row.get('Legal Name (First and Last)', '').strip().split()
                    legal_first_name = legal_name[0] if legal_name else ''
                    legal_last_name = ' '.join(legal_name[1:]) if len(legal_name) > 1 else ''

                    preferred_name = row.get('Preferred Name (First and Last)', '').strip().split()
                    preferred_first_name = preferred_name[0] if preferred_name else ''
                    preferred_last_name = ' '.join(preferred_name[1:]) if len(preferred_name) > 1 else ''

                    name_email = row.get('Name Email (ex: maeve.bihn@colorado.edu)', '').strip()
                    personal_email = row.get('Personal Email (ex: maevebihn1027@gmail.com) (Used to keep in touch when you become a future alumni)', '').strip()
                    phone_number = row.get('Phone Number', '').strip()
                    active_semester = parse_boolean(row.get('Will you be active this semester?', 'No'))

                    # Prepare SQL for INSERT or UPDATE
                    query = """
                    INSERT INTO users (
                        identikey,
                        legal_first_name,
                        legal_last_name,
                        preferred_first_name,
                        preferred_last_name,
                        name_email,
                        personal_email,
                        phone_number,
                        active_semester
                    ) VALUES (
                        %s, %s, %s, %s, %s, %s, %s, %s, %s
                    )
                    ON DUPLICATE KEY UPDATE
                        legal_first_name = VALUES(legal_first_name),
                        legal_last_name = VALUES(legal_last_name),
                        preferred_first_name = VALUES(preferred_first_name),
                        preferred_last_name = VALUES(preferred_last_name),
                        name_email = VALUES(name_email),
                        personal_email = VALUES(personal_email),
                        phone_number = VALUES(phone_number),
                        active_semester = VALUES(active_semester)
                    """
                    values = (
                        identikey,
                        legal_first_name,
                        legal_last_name,
                        preferred_first_name,
                        preferred_last_name,
                        name_email,
                        personal_email,
                        phone_number,
                        active_semester
                    )

                    try:
                        cursor.execute(query, values)
                        print(f"Inserted/Updated user: {identikey}")
                    except mysql.connector.Error as err:
                        print(f"Row {row_number}: Error inserting/updating user {identikey}: {err}")

                except Exception as e:
                    print(f"Row {row_number}: Error processing row: {e}")
                    continue

    except FileNotFoundError:
        print(f"File {member_status_file} not found.")
    except Exception as e:
        print(f"Error processing member status: {e}")
    finally:
        try:
            db.commit()
        except mysql.connector.Error as err:
            print(f"Error committing transaction: {err}")
        cursor.close()
        db.close()

if __name__ == "__main__":
    process_member_status()
