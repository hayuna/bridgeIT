'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

var _templates = require('./templates');

exports.default = async function (transporter, ADMIN_EMAILS) {
    if (!transporter) return;
    var inactiveRoles = await _models.Role.find({
        $and: [{ createdAt: { $gt: new Date(Date.now() - 60 * 60 * 1000) } }, { isActive: false }]
    });
    if (inactiveRoles.length === 0) return;
    var text = (0, _templates.roleNotifierMail)(inactiveRoles);
    var from = process.env.MAIL_EMAIL;
    var to = ADMIN_EMAILS.join(' ');
    var subject = 'New roles';
    transporter.sendMail({ from: from, to: to, subject: subject, text: text }).then(console.log('Sent new pending roles notifications')).catch(console.error);
};