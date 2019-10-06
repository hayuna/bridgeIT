'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _role = require('./role');

Object.defineProperty(exports, 'role', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_role).default;
  }
});

var _user = require('./user');

Object.defineProperty(exports, 'user', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_user).default;
  }
});

var _test = require('./test');

Object.defineProperty(exports, 'test', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_test).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }