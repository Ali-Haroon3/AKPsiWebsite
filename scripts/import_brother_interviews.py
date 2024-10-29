import csv
import os
import mysql.connector
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Set paths
interviews_file = os.path.join('data', 'Points  - Brother Interviews.csv')

# Connect to MySQL
db = mysql.connector.connect(
    host=os.getenv("MYSQL_HOST"),
    user=os.getenv("MYSQL_USER"),
    password=os.getenv("MYSQL_PASSWORD"),
    database=os.getenv("MYSQL_DATABASE"),
    port=int(os.getenv("MYSQL_PORT", 3306))
)
cursor = db.cursor()

def process_brother_interviews():
    try:
        with open(interviews_file, 'r', encoding='utf-8-sig') as f:
            reader = csv.reader(f)
            headers = next(reader)  # Skip header row

            for row_number, row in enumerate(reader, start=2):  # Start at 2 considering header
                pledge_identikey = row[0].strip()
                timestamp_str = row[2].strip()
                pledge_full_name = row[3].strip()
                brother_full_name = row[4].strip()
                brother_identikey = row[14].strip() if len(row) > 14 else None  # Column O is index 14

                if not pledge_identikey or not brother_full_name:
                    print(f"Skipping row {row_number}: Missing Identikey or Brother Name")
                    continue  # Skip rows without identikey or brother name

                # Parse timestamp
                try:
                    timestamp = datetime.strptime(timestamp_str, '%m/%d/%y %H:%M')
                except ValueError:
                    print(f"Invalid timestamp on row {row_number}: {timestamp_str}")
                    timestamp = None

                # Insert into database
                query = """
                INSERT INTO brother_interviews (pledge_identikey, brother_name, brother_identikey, timestamp)
                VALUES (%s, %s, %s, %s)
                """
                values = (pledge_identikey, brother_full_name, brother_identikey if brother_identikey else None, timestamp)
                try:
                    cursor.execute(query, values)
                    print(f"Inserted interview for {pledge_identikey} with {brother_full_name}")
                except mysql.connector.Error as err:
                    print(f"Error inserting interview for {pledge_identikey} with {brother_full_name}: {err}")

        db.commit()
        print("Brother interviews data imported successfully.")
    except FileNotFoundError:
        print(f"File {interviews_file} not found.")
    except Exception as e:
        print(f"Error processing brother interviews data: {e}")
    finally:
        cursor.close()
        db.close()

if __name__ == "__main__":
    process_brother_interviews()
