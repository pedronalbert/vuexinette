'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Entity;

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

var buildApi = function buildApi(url) {
  return {
    all: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _client2.default.request({ method: 'GET', url: url, params: params }));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function all(_x2) {
        return _ref.apply(this, arguments);
      };
    }(),

    get: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', _client2.default.request({
                  method: 'GET',
                  url: (0, _lodash.compact)([url, id, config.action]).join('/'),
                  params: params
                }));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function get(_x3) {
        return _ref2.apply(this, arguments);
      };
    }(),

    create: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', _client2.default.request({
                  method: 'POST',
                  url: url,
                  data: data
                }));

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function create(_x6) {
        return _ref3.apply(this, arguments);
      };
    }(),

    update: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, data) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt('return', _client2.default.request({
                  method: 'PUT',
                  url: url + '/' + id,
                  data: data
                }));

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      return function update(_x7, _x8) {
        return _ref4.apply(this, arguments);
      };
    }(),

    delete: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt('return', _client2.default.request({
                  method: 'DELETE',
                  url: url + '/' + id
                }));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, undefined);
      }));

      return function _delete(_x9) {
        return _ref5.apply(this, arguments);
      };
    }()
  };
};

function Entity(o) {
  if (!o.name) throw Error('You must specify a entity name');

  var opts = (0, _lodash.defaults)(o, {
    URL: '/' + o.name
  });

  var normalizrSchema = buildNormalizrSchema(opts.name, opts.schema);

  return _extends({}, opts, {
    normalizrSchema: normalizrSchema,
    api: buildApi(opts.url || '/' + opts.name)
  });
}