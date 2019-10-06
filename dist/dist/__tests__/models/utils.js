"use strict";

var _chai = require("chai");

var _models = require("../../src/models");

describe("Model utility functions", function () {
    beforeEach(async function () {
        await _models.Test.deleteMany({});
    });

    describe("The ensureFieldUniquity function", function () {
        it("Should not allow duplicate field values", function (done) {
            var firstTest = new _models.Test({ uniqueValuesField: "unique" });
            var secondTest = new _models.Test({ uniqueValuesField: "unique" });
            firstTest.save().then(function () {
                secondTest.save().then(function () {
                    return done("Function didn't throw an error");
                }).catch(function (error) {
                    (0, _chai.expect)(error).to.equal("Name already taken");
                    done();
                });
            });
        });
    });
});