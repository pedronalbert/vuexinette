'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installPlugin = exports.install = exports.Entity = exports.client = undefined;

var _installPlugin = require('./installPlugin');

var _installPlugin2 = _interopRequireDefault(_installPlugin);

var _install = require('./install');

var _install2 = _interopRequireDefault(_install);

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.client = _client2.default;
exports.Entity = _entity2.default;
exports.install = _install2.default;
exports.installPlugin = _installPlugin2.default;
exports.default = {
  installPlugin: _installPlugin2.default,
  install: _install2.default,
  Entity: _entity2.default,
  client: _client2.default
};