'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

exports.default = function (fieldName) {
    return async function (next, done) {
        var uniqueField = this[fieldName];
        await this.constructor.findOne(_defineProperty({}, fieldName, uniqueField), function (err, documentThatTookTheValue) {
            if (err) done(err);
            if (documentThatTookTheValue) done('Name already taken');
            done();
        });
    };
};