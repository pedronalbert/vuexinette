'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REMOVE_NESTED_RESOURCE = exports.ADD_NESTED_RESOURCE = exports.DELETE = exports.MERGE = undefined;

var _mutations;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _lodash = require('lodash');

var _normalizr = require('normalizr');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MERGE = exports.MERGE = 'MERGE';
var DELETE = exports.DELETE = 'DELETE';
var ADD_NESTED_RESOURCE = exports.ADD_NESTED_RESOURCE = 'ADD_NESTED_RESOURCE';
var REMOVE_NESTED_RESOURCE = exports.REMOVE_NESTED_RESOURCE = 'REMOVE_NESTED_RESOURCE';

exports.default = {
  namespaced: true,

  state: {},

  getters: {
    byIds: function byIds(state) {
      return function (ids, name, schema) {
        return (0, _normalizr.denormalize)(_defineProperty({}, name, ids), _defineProperty({}, name, [schema]), state)[name] || [];
      };
    },

    byId: function byId(state) {
      return function (id, name, schema) {
        return (0, _normalizr.denormalize)(_defineProperty({}, name, id), _defineProperty({}, name, schema), state)[name] || null;
      };
    }
  },

  mutations: (_mutations = {}, _defineProperty(_mutations, MERGE, function (state, _ref) {
    var data = _ref.data,
        schema = _ref.schema,
        name = _ref.name;

    var _normalize = (0, _normalizr.normalize)(_defineProperty({}, name, data), _defineProperty({}, name, (0, _lodash.isArray)(data) ? [schema] : schema)),
        entities = _normalize.entities;

    (0, _lodash.each)(entities, function (data, key) {
      _vue2.default.set(state, key, _extends({}, (0, _lodash.get)(state, key, {}), data));
    });
  }), _defineProperty(_mutations, DELETE, function (state, _ref2) {
    var entity = _ref2.entity,
        id = _ref2.id;

    (0, _lodash.assign)(state, {
      entity: _extends({}, state.entity, _defineProperty({}, String(id), _extends({}, state.entity[String(id)], {
        isDeleted: true
      })))
    });
  }), _mutations)
};