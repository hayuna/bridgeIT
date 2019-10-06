'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _utils = require('./utils');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var UserSchema = new _mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'Role' }],
    isActive: { type: Boolean, default: false }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (user.password && user.isModified('password')) {
        var salt = _bcrypt2.default.genSaltSync(10);
        user.password = _bcrypt2.default.hashSync(user.password, salt);
    }
    next();
    (0, _utils.ensureFieldUniquity)('login');
});

exports.default = (0, _mongoose.model)('User', UserSchema);