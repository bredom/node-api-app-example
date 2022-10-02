// Run 'node seeder.js -i' to install data to thee database and 'node seeder.js -d' to delete data from database

const fs = require('fs');
const mongoose = require('mongoose');
// const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config.env' });

// Connect to DB
require('./db/db');

// Import into DB
//"node seeder.js -i Product products.json"
const importData = async (model, data) => {
  const Model = require(`./models/${model}`);

  const filename = JSON.parse(
    fs.readFileSync(`${__dirname}/data/${data}`, 'utf-8')
  );

  try {
    await Model.deleteMany();
    await Model.create(filename);

    console.log('Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async model => {
  try {
    const Model = require(`./models/${model}`);

    await Model.deleteMany();

    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData(process.argv[3], process.argv[4]);
} else if (process.argv[2] === '-d') {
  deleteData(process.argv[3]);
}
