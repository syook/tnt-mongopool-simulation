'use strict'
const Schema = require('mongoose').Schema;
const db = require('./db').db

const personSchema = new Schema({
  name: {
    type: String
  },
  mobile: {
    type: String
  }
})

module.exports = db.model('Person',personSchema);