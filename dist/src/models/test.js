'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _utils = require('./utils');

var _mocha = require('mocha');

var TestSchema = new _mongoose.Schema({
    name: { type: String },
    uniqueValuesField: { type: String, required: true, unique: true }
});

TestSchema.pre('save', true, (0, _utils.ensureFieldUniquity)('uniqueValuesField'));

exports.default = (0, _mongoose.model)('Test', TestSchema);