# import csv
# import os
# import mysql.connector
# from dotenv import load_dotenv

# # Load environment variables from .env file
# load_dotenv()

# # Set paths
# interviews_file = os.path.join('data', 'Points  - Brother Interviews.csv')

# # Connect to MySQL
# db = mysql.connector.connect(
#     host=os.getenv("MYSQL_HOST"),
#     user=os.getenv("MYSQL_USER"),
#     password=os.getenv("MYSQL_PASSWORD"),
#     database=os.getenv("MYSQL_DATABASE"),
#     port=int(os.getenv("MYSQL_PORT", 3306))
# )
# cursor = db.cursor()

# def process_brother_interviews():
#     try:
#         with open(interviews_file, 'r', encoding='utf-8-sig') as f:
#             reader = csv.reader(f)
#             headers = next(reader)  # Skip header row

#             for row_number, row in enumerate(reader, start=3):  # Start at 2 considering header
#                 # Ensure the row has enough columns
#                 if len(row) < 15:
#                     print(f"Skipping row {row_number}: Not enough columns")
#                     continue

#                 # Extract necessary fields
#                 brother_identikey_a = row[0].strip()  # Column A
#                 count = row[1].strip()  # Column B
#                 pledge_full_name = row[3].strip()   # Column D
#                 brother_identikey_o = row[14].strip()  # Column O

#                 # Skip rows where both brother_identikeys are missing
#                 if not brother_identikey_a and not brother_identikey_o:
#                     print(f"Skipping row {row_number}: Both Brother Identikeys are missing")
#                     continue

#                 # Use brother_identikey from Column A if available, else from Column O
#                 brother_identikey = brother_identikey_a if brother_identikey_a else brother_identikey_o

#                 # Validate pledge_full_name
#                 if not pledge_full_name:
#                     print(f"Skipping row {row_number}: Missing Pledge Full Name")
#                     continue

#                 # Insert into database
#                 query = """
#                 INSERT INTO brother_interviews (brother_identikey, pledge_full_name)
#                 VALUES (%s, %s)
#                 """
#                 values = (brother_identikey.lower(), pledge_full_name)
#                 try:
#                     cursor.execute(query, values)
#                     print(f"Inserted interview for Brother Identikey {brother_identikey} with Pledge '{pledge_full_name}'")
#                 except mysql.connector.Error as err:
#                     print(f"Error inserting interview for Brother Identikey {brother_identikey} with Pledge '{pledge_full_name}': {err}")

#         db.commit()
#         print("Brother interviews data imported successfully.")
#     except FileNotFoundError:
#         print(f"File {interviews_file} not found.")
#     except Exception as e:
#         print(f"Error processing brother interviews data: {e}")
#     finally:
#         cursor.close()
#         db.close()

# if __name__ == "__main__":
#     process_brother_interviews()
import csv
import os
import mysql.connector
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Set paths
interviews_file = os.path.join('data', 'Points - Interviews List.csv')  # Ensure the correct file name and path

# Connect to MySQL
db = mysql.connector.connect(
    host=os.getenv("MYSQL_HOST"),
    user=os.getenv("MYSQL_USER"),
    password=os.getenv("MYSQL_PASSWORD"),
    database=os.getenv("MYSQL_DATABASE"),
    port=int(os.getenv("MYSQL_PORT", 3306))
)
cursor = db.cursor(dictionary=True)

def process_brother_interviews():
    try:
        with open(interviews_file, 'r', encoding='utf-8-sig') as f:
            reader = csv.reader(f)
            headers = next(reader)  # Skip header row

            for row_number, row in enumerate(reader, start=2):  # Start at 2 considering header
                # Ensure the row has enough columns
                if len(row) < 3:
                    print(f"Skipping row {row_number}: Not enough columns")
                    continue

                # Extract necessary fields
                pledge_full_name = row[0].strip()
                brother_full_name = row[1].strip()
                brother_identikey = row[2].strip().lower()

                # If brother_identikey is 'Not Found' or empty, try to find identikey from brother_full_name
                if not brother_identikey or brother_identikey.lower() == 'not found':
                    # Try to look up the identikey in the users table
                    # Assume brother_full_name is in the format 'Firstname Lastname'
                    brother_full_name_lower = brother_full_name.lower()
                    query = "SELECT identikey FROM users WHERE CONCAT(firstname, ' ', lastname) = %s"
                    cursor.execute(query, (brother_full_name,))
                    result = cursor.fetchone()
                    if result:
                        brother_identikey = result['identikey'].lower()
                        print(f"Found identikey '{brother_identikey}' for brother '{brother_full_name}'")
                    else:
                        print(f"Skipping row {row_number}: Brother identikey not found for '{brother_full_name}'")
                        continue

                # Insert into database
                query = """
                INSERT INTO brother_interviews (brother_identikey, pledge_full_name)
                VALUES (%s, %s)
                """
                values = (brother_identikey, pledge_full_name)
                try:
                    cursor.execute(query, values)
                    print(f"Inserted interview for Brother Identikey '{brother_identikey}' with Pledge '{pledge_full_name}'")
                except mysql.connector.Error as err:
                    print(f"Error inserting interview for Brother Identikey '{brother_identikey}' with Pledge '{pledge_full_name}': {err}")

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
