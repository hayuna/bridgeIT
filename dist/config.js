'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _nodeCron = require('node-cron');

var _nodeCron2 = _interopRequireDefault(_nodeCron);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _jobs = require('./src/jobs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var transporter = void 0; //nodemailer
var NOTIFICATION_INTERVAL = 1; // duration of the interval between notifications in hours
var ADMIN_EMAILS = ["email@ejemplo.es", "email@example.com"];

var setHeaders = function setHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
};

var mongo_connect = function mongo_connect() {
    var mongo_url = void 0;
    console.log(process.env.NODE_ENV);
    switch (process.env.NODE_ENV) {
        case 'test':
            mongo_url = process.env.MONGO_URL_TEST;
            break;
        case 'production':
            mongo_url = process.env.MONGO_URL_PROD;
            break;
        case 'development':
            mongo_url = process.env.MONGO_URL_DEV;
            break;
        default:
            mongo_url = process.env.MONGO_URL_DEV;
    }
    _mongoose2.default.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
};

var useMiddleware = function useMiddleware(app) {
    app.use((0, _cors2.default)());
    app.use((0, _helmet2.default)());
    app.use((0, _morgan2.default)('dev'));
    app.use(_bodyParser2.default.json());
};

var initNodeMailer = function initNodeMailer() {
    var _nodemailer$createTra;

    var _process$env = process.env,
        MAIL_SERVICE = _process$env.MAIL_SERVICE,
        MAIL_EMAIL = _process$env.MAIL_EMAIL,
        MAIL_PASSWORD = _process$env.MAIL_PASSWORD,
        MAIL_HOST = _process$env.MAIL_HOST;


    if (!(MAIL_EMAIL && MAIL_PASSWORD && (MAIL_HOST || MAIL_SERVICE))) return false;

    transporter = _nodemailer2.default.createTransport((_nodemailer$createTra = {}, _defineProperty(_nodemailer$createTra, MAIL_HOST ? "host" : "service", MAIL_HOST || MAIL_SERVICE), _defineProperty(_nodemailer$createTra, 'auth', {
        user: MAIL_EMAIL,
        pass: MAIL_PASSWORD
    }), _nodemailer$createTra));
};

var kickstartScheduler = function kickstartScheduler() {
    _nodeCron2.default.schedule('0 */' + NOTIFICATION_INTERVAL + ' * * *', function () {
        return (0, _jobs.roleNotifier)(transporter, ADMIN_EMAILS);
    });
};

exports.default = { setHeaders: setHeaders, mongo_connect: mongo_connect, useMiddleware: useMiddleware, initNodeMailer: initNodeMailer, kickstartScheduler: kickstartScheduler };