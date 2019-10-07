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

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var createError = require('http-errors');

var app = (0, _express2.default)();

_config2.default.useMiddleware(app);
_config2.default.mongo_connect();
_config2.default.initNodeMailer();
_config2.default.kickstartScheduler();
var MongoDBUtil = require('./modules/mongodb/mongodb.module').MongoDBUtil;
var CustomerController = require('./modules/customer/customer.module')().CustomerControlller;
MongoDBUtil.init();

app.get('/', function (req, res) {
    res.send('works');
});
app.use('/test', _routes.test);
app.use('/role', _routes.role);
app.use('/user', _routes.user);
app.use('/customers', CustomerController);
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    res.json({
        message: res.locals.message,
        error: res.locals.error
    });
});

var port = process.env.PORT || 1200;
var server = app.listen(port, function (err) {
    if (err) throw err;
    console.log('> Ready on port ' + port);
});
exports.default = server;