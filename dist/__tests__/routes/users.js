'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _models = require('../../src/models');

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
_chai2.default.use(_chaiHttp2.default);

describe('Users', function () {
    this.timeout(10000);

    describe('GET /user', function () {
        it('it should return an array of users', function (done) {
            _chai2.default.request(_index2.default).get('/user').end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });

    describe('POST /user', function () {
        it('should accept new user, hash password, save it and provide feedback', function (done) {
            var user = {
                "login": "sampleText3",
                "password": "12345678",
                "role": []
            };
            _chai2.default.request(_index2.default).post('/user').send(user).end(function (err, res) {
                res.should.have.status(201);

                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('login');
                res.body.should.have.property('password');
                res.body.should.have.property('role');
                res.body.should.have.property('isActive');

                res.body["isActive"].should.equal(true);
                res.body["login"].should.be.a('string');
                res.body["password"].should.be.a('string');
                res.body["role"].should.be.a('array');

                done();
            });
        });
    });
});