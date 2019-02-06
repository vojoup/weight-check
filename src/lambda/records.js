/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const Record = require('./recordModel');
require('dotenv').config();

const { DB_URL } = process.env;

export async function handler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log('DB_URL', DB_URL);

  try {
    await mongoose.connect(DB_URL, { useNewUrlParser: true });
    console.log(`Connected to DB!`);
    const records = await Record.find()
      .sort({ date: 'desc' })
      .limit(10);

    console.log(records);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(records),
    });
  } catch (err) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: { ...err, message: 'Something went wrong' },
      }),
    });
    console.error(err);
  }
}
