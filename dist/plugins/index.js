'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletable = exports.updatable = exports.creatable = exports.fetchableList = exports.fetchable = undefined;

var _fetchable = require('./fetchable');

var _fetchable2 = _interopRequireDefault(_fetchable);

var _fetchableList = require('./fetchableList');

var _fetchableList2 = _interopRequireDefault(_fetchableList);

var _creatable = require('./creatable');

var _creatable2 = _interopRequireDefault(_creatable);

var _deletable = require('./deletable');

var _deletable2 = _interopRequireDefault(_deletable);

var _updatable = require('./updatable');

var _updatable2 = _interopRequireDefault(_updatable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.fetchable = _fetchable2.default;
exports.fetchableList = _fetchableList2.default;
exports.creatable = _creatable2.default;
exports.updatable = _updatable2.default;
exports.deletable = _deletable2.default;
exports.default = {
  fetchable: _fetchable2.default,
  fetchableList: _fetchableList2.default,
  creatable: _creatable2.default,
  deletable: _deletable2.default,
  updatable: _updatable2.default
};