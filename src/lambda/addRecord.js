/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const Record = require('./recordModel');
require('dotenv').config();

const { DB_URL } = process.env;

export async function handler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  const data = JSON.parse(event.body);
  console.log('event', event);
  const newRecord = new Record({
    weight: data.weight,
    date: new Date().toISOString(),
  });

  try {
    await mongoose.connect(DB_URL, { useNewUrlParser: true });
    console.log(`Connected to DB!`);
    const savedRecord = await newRecord.save();

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(savedRecord),
    });
  } catch (err) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: err,
        message: 'Something went wrong',
      }),
    });
    console.error(err);
  }
}
