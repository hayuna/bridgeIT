'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _controllers = require('../controllers');

var _routeHelpers = require('../helpers/routeHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _expressPromiseRouter2.default)();

router.route('/').get(_controllers.role.index).post((0, _routeHelpers.validateBody)(_routeHelpers.schema.role.post), _controllers.role.add);

router.route('/:desiredAction((((de)?)activate))/:id').patch((0, _routeHelpers.validateParam)(_routeHelpers.schema.id, 'id'), _controllers.role.switchActivity);

router.route('/:id').get((0, _routeHelpers.validateParam)(_routeHelpers.schema.id, 'id'), _controllers.role.get).put([(0, _routeHelpers.validateParam)(_routeHelpers.schema.id, 'id'), (0, _routeHelpers.validateBody)(_routeHelpers.schema.role.put)], _controllers.role.replace).patch([(0, _routeHelpers.validateParam)(_routeHelpers.schema.id, 'id'), (0, _routeHelpers.validateBody)(_routeHelpers.schema.role.patch)], _controllers.role.update).delete((0, _routeHelpers.validateParam)(_routeHelpers.schema.id, 'id'), _controllers.role.remove);

exports.default = router;