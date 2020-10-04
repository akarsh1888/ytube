"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var mongoose = require('mongoose'); // small letter for schema definition


var user = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    unique: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  betaUser: {
    default: false,
    type: Boolean
  },
  birthDate: Date,
  pets: [{
    type: String
  }],
  address: {
    other: Boolean,
    street: String,
    houseNumber: Number,
    zip: Number,
    city: String,
    State: String
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'article'
  }]
}, {
  timestamps: true
});
/*  
schema hold the instructions for model, ie.validation,indexes etc.
here schema is converted into model,model is the JSON way of interacting with the database
*/
// capital letter for a model

var _default = mongoose.model('user', user);

exports.default = _default;