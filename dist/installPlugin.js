'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

exports.default = function (module, plugin) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var attrs = plugin(opts);

  (0, _lodash.merge)(module, {
    state: (0, _lodash.get)(attrs, 'state', {}),
    mutations: (0, _lodash.get)(attrs, 'mutations', {}),
    actions: _extends({}, (0, _lodash.get)(attrs, 'actions', {}), module.actions),
    getters: _extends({}, (0, _lodash.get)(attrs, 'getters', {}), module.getters)
  });
};