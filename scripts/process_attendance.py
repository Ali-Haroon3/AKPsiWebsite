import csv
import mysql.connector
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Set paths
attendance_file = os.path.join('data', 'SECRETARY_F24_Chapter_Attendance.csv')

# Connect to MySQL
db = mysql.connector.connect(
    host=os.getenv('MYSQL_HOST'),
    user=os.getenv('MYSQL_USER'),
    password=os.getenv('MYSQL_PASSWORD'),
    database=os.getenv('MYSQL_DATABASE')
)
cursor = db.cursor()

def process_attendance():
    try:
        with open(attendance_file, 'r') as f:
            reader = csv.DictReader(f)

            for row in reader:
                identikey = row.get('Identikey')
                absences = row.get('TOTAL ABSENCES')

                if identikey and absences is not None:
                    try:
                        absences = int(absences)
                        query = """
                            UPDATE users 
                            SET unexcused_absences = %s 
                            WHERE identikey = %s
                        """
                        cursor.execute(query, (absences, identikey))
                        print(f"Updated {identikey} with {absences} unexcused absences.")
                    except ValueError:
                        print(f"Skipping invalid absence value for {identikey}")

        db.commit()
        print("Attendance data processed successfully.")
    except Exception as e:
        print(f"Error processing attendance: {e}")
    finally:
        cursor.close()
        db.close()

if __name__ == "__main__":
    process_attendance()
