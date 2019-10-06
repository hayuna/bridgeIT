'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

var index = async function index(req, res) {
    res.status(200).json(process.env);
};

var add = async function add(req, res) {
    var newTest = new _models.Test(req.value.body);
    var test = await newTest.save();
    res.status(201).json(test);
};

var get = async function get(req, res) {
    var testId = req.value.params.testId;

    var test = await _models.Test.findById(testId);
    res.status(200).json(test);
};

var replace = async function replace(req, res) {
    var testId = req.value.params.testId;

    var newTest = req.value.body;
    await _models.Test.findByIdAndUpdate(testId, newTest);
    res.status(200).json({ success: true });
};

var update = async function update(req, res) {
    var testId = req.value.params.testId;

    var newTest = req.value.body;
    await _models.Test.findByIdAndUpdate(testId, newTest);
    res.status(200).json({ success: true });
};

exports.default = { index: index, add: add, get: get, replace: replace, update: update };