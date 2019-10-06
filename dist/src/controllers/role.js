"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require("../models");

var index = async function index(req, res) {
    var roles = await _models.Role.find({});
    res.status(200).json(roles);
};

var add = async function add(req, res) {
    var newRole = new _models.Role(req.value.body);
    var role = await newRole.save();
    res.status(201).json(role);
};

var get = async function get(req, res) {
    var id = req.value.params.id;

    var role = await _models.Role.findById(id);
    res.status(200).json(role);
};

var replace = async function replace(req, res) {
    var id = req.value.params.id;

    var newRole = req.value.body;
    await _models.Role.findByIdAndUpdate(id, newRole);
    res.status(200).json({ success: true });
};

var update = async function update(req, res) {
    var id = req.value.params.id;

    var newRole = req.value.body;
    await _models.Role.findByIdAndUpdate(id, newRole);
    res.status(200).json({ success: true });
};

var remove = async function remove(req, res) {
    var id = req.value.params.id;

    await _models.Role.findByIdAndRemove(id);
    res.status(202).json({ success: true });
};

var switchActivity = async function switchActivity(req, res) {
    var id = req.value.params.id;
    var desiredAction = req.params.desiredAction;

    await _models.Role.findByIdAndUpdate(id, { isActive: desiredAction === "activate" });
    res.status(200).json({ success: true });
};

exports.default = { index: index, add: add, get: get, replace: replace, update: update, remove: remove, switchActivity: switchActivity };