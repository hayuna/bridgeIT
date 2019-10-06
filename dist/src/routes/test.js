'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _test = require('../controllers/test');

var _test2 = _interopRequireDefault(_test);

var _routeHelpers = require('../helpers/routeHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _expressPromiseRouter2.default)();

router.route('/').get(_test2.default.index).post((0, _routeHelpers.validateBody)(_routeHelpers.schema.test.post), _test2.default.add);

router.route('/nowtest').get(_test2.default.index);

router.route('/:id').get((0, _routeHelpers.validateParam)(_routeHelpers.schema.id, 'id'), _test2.default.get).put([(0, _routeHelpers.validateParam)(_routeHelpers.schema.id, 'id'), (0, _routeHelpers.validateBody)(_routeHelpers.schema.test.put)], _test2.default.replace).patch([(0, _routeHelpers.validateParam)(_routeHelpers.schema.id, 'id'), (0, _routeHelpers.validateBody)(_routeHelpers.schema.test.patch)], _test2.default.update);

exports.default = router;