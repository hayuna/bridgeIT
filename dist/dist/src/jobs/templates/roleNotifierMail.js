'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (roles) {
    var messageBody = '';
    roles.forEach(function (role) {
        return messageBody += '--> role "' + role.name + '" of color ' + role.color + ' is inactive\n';
    });
    return 'There are new roles that need to be reviewed and activated!\n    ' + messageBody;
};