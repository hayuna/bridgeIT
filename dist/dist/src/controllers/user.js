"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require("../models");

var index = async function index(req, res) {
    var users = await _models.User.find({});
    res.status(200).json(users);
};

var add = async function add(req, res) {
    var newUser = new _models.User(req.value.body);
    var user = await newUser.save();
    res.status(201).json(user);
};

var get = async function get(req, res) {
    var id = req.value.params.id;

    var user = await _models.User.findById(id);
    res.status(200).json(user);
};

var replace = async function replace(req, res) {
    var id = req.value.params.id;

    var newUser = req.value.body;
    await _models.User.findByIdAndUpdate(id, newUser);
    res.status(200).json({ success: true });
};

var update = async function update(req, res) {
    var id = req.value.params.id;

    var newUser = req.value.body;
    await _models.User.findByIdAndUpdate(id, newUser);
    res.status(200).json({ success: true });
};

var switchActivity = async function switchActivity(req, res) {
    var id = req.value.params.id;
    var desiredAction = req.params.desiredAction;

    await _models.User.findByIdAndUpdate(id, {
        isActive: desiredAction === "activate"
    });
    res.status(200).json({ success: true });
};

var deleteUser = async function deleteUser(req, res) {
    var id = req.params.id;

    await _models.User.deleteOne({ _id: id });
    res.status(200).json({ success: true });
};

exports.default = { index: index, add: add, get: get, replace: replace, update: update, switchActivity: switchActivity, deleteUser: deleteUser };