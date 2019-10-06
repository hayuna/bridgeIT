'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.schema = exports.validateBody = exports.validateParam = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var validateParam = exports.validateParam = function validateParam(schema, name) {
    return function (req, res, next) {
        var result = _joi2.default.validate({
            param: req.params[name]
        }, schema);
        if (result.error) {
            return res.status(400).json(result.error);
        } else {
            if (!req.value) req.value = {};
            if (!req.value.params) req.value.params = {};
            req.value.params[name] = result.value.param;
            next();
        }
    };
};

var validateBody = exports.validateBody = function validateBody(schema) {
    return function (req, res, next) {
        var result = _joi2.default.validate(req.body, schema);
        if (result.error) {
            return res.status(400).json(result.error);
        } else {
            if (!req.value) req.value = {};
            if (!req.value.body) req.value.body = {};
            req.value.body = result.value;
            next();
        }
    };
};

var schema = exports.schema = {
    test: {
        post: _joi2.default.object().keys({
            name: _joi2.default.string().required()
        }),
        put: _joi2.default.object().keys({
            name: _joi2.default.string().required()
        }),
        patch: _joi2.default.object().keys({
            name: _joi2.default.string()
        })
    },
    role: {
        post: _joi2.default.object().keys({
            name: _joi2.default.string().required(),
            color: _joi2.default.string().required().regex(/#([0-9a-f]{6}|[0-9a-f]{3})/i)
        }),
        put: _joi2.default.object().keys({
            name: _joi2.default.string().required(),
            color: _joi2.default.string().required().regex(/#([0-9a-f]{6}|[0-9a-f]{3})/i)
        }),
        patch: _joi2.default.object().keys({
            name: _joi2.default.string(),
            color: _joi2.default.string().regex(/#([0-9a-f]{6}|[0-9a-f]{3})/i)
        })
    },
    id: _joi2.default.object().keys({
        param: _joi2.default.string().regex(/^[0-9a-fA-Z]{24}$/).required()
    }),
    user: {
        post: _joi2.default.object().keys({
            login: _joi2.default.string().required(),
            password: _joi2.default.string().required().regex(/^[a-zA-Z0-9]{6,}$/),
            role: _joi2.default.array().required()
        }),
        put: _joi2.default.object().keys({
            login: _joi2.default.string().required(),
            password: _joi2.default.string().required().regex(/^[a-zA-Z0-9]{6,}$/),
            role: _joi2.default.array().required()
        }),
        patch: _joi2.default.object().keys({
            login: _joi2.default.string(),
            password: _joi2.default.string().regex(/^[a-zA-Z0-9]{6,}$/),
            role: _joi2.default.array()
        })
    }
};