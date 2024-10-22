const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const db = require('./models/db');

// CSV path
const csvFilePath = path.join(__dirname, '..', 'data', 'Fall2024.csv');

function isRowValid(row) {
  return (
    row['Preferred Name (First and Last)'] &&
    row['Identikey Email (ex: jato9141@colorado.edu)'] &&
    row['Will you be active this semester?']
  );
}

function extractIdentikey(email) {
  return email ? email.substring(0, 8) : null;
}

function parseActiveStatus(status) {
  return status.toLowerCase() === 'yes' ? 1 : 0;
}

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', async (row) => {
    if (!isRowValid(row)) {
      console.warn(`Skipping invalid row: ${JSON.stringify(row)}`);
      return;
    }

    const identikey = extractIdentikey(row['Identikey Email (ex: jato9141@colorado.edu)']);
    const preferredName = row['Preferred Name (First and Last)'];
    const email = row['Identikey Email (ex: jato9141@colorado.edu)'];
    const isActive = parseActiveStatus(row['Will you be active this semester?']);

    if (isActive === 0) {
      console.log(`Skipping inactive user: ${preferredName} (${identikey})`);
      return;
    }

    const query = `
      INSERT INTO users (identikey, preferred_name, email, is_active)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE is_active = VALUES(is_active);
    `;

    db.query(query, [identikey, preferredName, email, isActive], (err) => {
      if (err) {
        console.error(`Error inserting row: ${err.message}`);
        return;
      }
      console.log(`Inserted/Updated: ${identikey}`);
    });
  })
  .on('end', () => {
    console.log('CSV file processed successfully.');
    db.end();
  });
