const mongoose = require('mongoose');

const { Schema } = mongoose;

const recordSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Record', recordSchema);
