'use strict';

const Schema = require('mongoose').Schema;
const db = require('./db').db;

const CardSchema = new Schema({
  number: {
    type: Number
  }
});

CardSchema.pre('save',(next) => {
  console.log('BEFORE SAVE WORKS');
  next();
});

module.exports = db.model('Card',CardSchema);