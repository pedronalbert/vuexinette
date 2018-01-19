'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Entity;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _normalizr = require('normalizr');

var _lodash = require('lodash');

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var buildNormalizrSchema = function buildNormalizrSchema(entityName) {
  var bareSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var objSchema = {};

  (0, _lodash.each)(bareSchema, function (value, key) {
    objSchema[key] = (0, _lodash.isArray)(value) ? [value[0].normalizrSchema] : value.normalizrSchema;
  });

  return new _normalizr.schema.Entity(entityName, objSchema);
};

var FILLABLE_OPTS_KEYS = ['url', 'params', 'data', 'baseURL'];

var buildApi = function buildApi(clientOpts) {
  return {
    all: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _client2.default.request(_extends({
                  method: 'GET'
                }, clientOpts, (0, _lodash.pick)(opts, FILLABLE_OPTS_KEYS))));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      function all() {
        return _ref.apply(this, arguments);
      }

      return all;
    }(),

    get: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', _client2.default.request(_extends({
                  method: 'GET'
                }, clientOpts, (0, _lodash.pick)(opts, FILLABLE_OPTS_KEYS), {
                  url: (0, _lodash.compact)([opts.url || clientOpts.url, id, opts.action]).join('/')
                })));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      function get(_x4) {
        return _ref2.apply(this, arguments);
      }

      return get;
    }(),

    create: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', _client2.default.request(_extends({
                  method: 'POST'
                }, clientOpts, (0, _lodash.pick)(opts, FILLABLE_OPTS_KEYS))));

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      function create() {
        return _ref3.apply(this, arguments);
      }

      return create;
    }(),

    update: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt('return', _client2.default.request(_extends({
                  method: 'PUT'
                }, clientOpts, (0, _lodash.pick)(opts, FILLABLE_OPTS_KEYS), {
                  url: (opts.url || clientOpts.url) + '/' + id
                })));

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      function update(_x7) {
        return _ref4.apply(this, arguments);
      }

      return update;
    }(),

    delete: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt('return', _client2.default.request(_extends({
                  method: 'DELETE'
                }, clientOpts, (0, _lodash.pick)(opts, FILLABLE_OPTS_KEYS), {
                  url: (clientOpts.url || opts.url) + '/' + id
                })));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, undefined);
      }));

      function _delete(_x9) {
        return _ref5.apply(this, arguments);
      }

      return _delete;
    }()
  };
};

function Entity(o) {
  if (!o.name) throw Error('You must specify a entity name');

  var opts = (0, _lodash.defaults)(o, {
    url: '/' + o.name
  });

  var normalizrSchema = buildNormalizrSchema(opts.name, opts.schema);

  return _extends({}, opts, {
    normalizrSchema: normalizrSchema,
    api: buildApi(opts.client)
  });
}