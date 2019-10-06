'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _routes = require('./src/routes');

require('dotenv/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

_config2.default.useMiddleware(app);
_config2.default.mongo_connect();
_config2.default.initNodeMailer();
_config2.default.kickstartScheduler();

app.get('/', function (req, res) {
    res.send('works');
});
app.use('/test', _routes.test);
app.use('/role', _routes.role);
app.use('/user', _routes.user);

var port = process.env.PORT || 1200;
var server = app.listen(port, function (err) {
    if (err) throw err;
    console.log('> Ready on port ' + port);
});
exports.default = server;