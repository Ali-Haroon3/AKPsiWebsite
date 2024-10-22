import csv
import mysql.connector
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Set paths
busik_file = os.path.join('data', 'Points  - BUSIK Letters.csv')

# Connect to MySQL
db = mysql.connector.connect(
    host=os.getenv("MYSQL_HOST"),
    user=os.getenv("MYSQL_USER"),
    password=os.getenv("MYSQL_PASSWORD"),
    database=os.getenv("MYSQL_DATABASE"),
    port=os.getenv("MYSQL_PORT")
)
cursor = db.cursor()

def process_busik_letters():
    try:
        with open(busik_file, 'r') as f:
            reader = csv.DictReader(f)

            for row in reader:
                identikey = row.get('Identikey', '').strip()
                busik_letters = row.get('busik_letters', '').strip()

                if identikey and busik_letters.isdigit():
                    try:
                        busik_letters = int(busik_letters)

                        # Check if identikey exists in the database
                        cursor.execute("SELECT identikey FROM users WHERE identikey = %s", (identikey,))
                        result = cursor.fetchone()

                        if result:
                            # Update busik_letters in the MySQL database
                            query = """
                                UPDATE users 
                                SET busik_letters = %s 
                                WHERE identikey = %s
                            """
                            cursor.execute(query, (busik_letters, identikey))
                            print(f"Updated {identikey} with {busik_letters} BUSIK letters.")
                        else:
                            print(f"Identikey {identikey} not found in the database.")

                    except ValueError as e:
                        print(f"Skipping invalid busik_letters value for {identikey}: {e}")

        db.commit()
        print("BUSIK letters data processed successfully.")

    except FileNotFoundError:
        print(f"File {busik_file} not found.")
    except Exception as e:
        print(f"Error processing BUSIK letters: {e}")
    finally:
        cursor.close()
        db.close()

if __name__ == "__main__":
    process_busik_letters()
