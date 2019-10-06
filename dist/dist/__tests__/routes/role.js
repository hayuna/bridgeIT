'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _models = require('../../src/models');

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongodbMemoryServer = require('mongodb-memory-server');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var mongoServer = void 0;
var opts = { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true };

before(function (done) {
    mongoServer = new _mongodbMemoryServer.MongoMemoryServer();
    mongoServer.getConnectionString().then(function (mongoUri) {
        return _mongoose2.default.connect(mongoUri, opts, function (err) {
            if (err) done(err);
        });
    }).then(function () {
        return done();
    });
});

after(async function () {
    await _mongoose2.default.disconnect();
    await mongoServer.stop();
});

var should = _chai2.default.should();
_chai2.default.use(_chaiHttp2.default);

describe('Roles', function () {
    it('GET /role', async function () {
        var roles = await _models.Role.countDocuments();
        (0, _chai.expect)(roles).to.equal(0);
    });

    it('POST /role', async function () {
        var role = {
            name: "sam9ple text_88",
            color: "#fff"
        };
        var result = await _chai2.default.request(_index2.default).post('/role').send(role);
        var expectedResponse = JSON.parse(result.res.text);
        console.log(_typeof(expectedResponse.isActive));
        console.log(expectedResponse.isActive);

        (0, _chai.expect)(Boolean(expectedResponse.isActive)).should.equal(false);
        (0, _chai.expect)(String(expectedResponse.name)).should.equal(role.name);
        (0, _chai.expect)(String(expectedResponse.color)).should.equal(role.color);
    });

    it('PATCH /role', function (done) {
        var role = new _models.Role({
            name: "sample text",
            color: "#333"
        });

        role.save().then(function (savedRole) {
            var rolePatch = {
                name: "sample text 2",
                color: "#666"
            };
            _chai2.default.request(_index2.default).patch('/role/' + savedRole._id).send(rolePatch).end(async function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body["success"].should.equal(true);
                var retrievedUpdatedRole = await _models.Role.findById(savedRole._id);
                (0, _chai.expect)(rolePatch["name"]).to.equal(retrievedUpdatedRole["name"]);
                (0, _chai.expect)(rolePatch["color"]).to.equal(retrievedUpdatedRole["color"]);
                done();
            });
        });
    });
});