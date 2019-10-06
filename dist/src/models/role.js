'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _utils = require('./utils');

var RoleSchema = new _mongoose.Schema({
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    isActive: { type: Boolean, default: false }
}, { timestamps: true });

RoleSchema.pre('save', true, (0, _utils.ensureFieldUniquity)('name'));

exports.default = (0, _mongoose.model)('Role', RoleSchema);