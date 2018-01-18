'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mutations = exports.UPDATE_FAILED = exports.UPDATE_SUCCESS = exports.UPDATE_START = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mutations;

var _lodash = require('lodash');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UPDATE_START = exports.UPDATE_START = 'CREATE_START';
var UPDATE_SUCCESS = exports.UPDATE_SUCCESS = 'CREATE_SUCCESS';
var UPDATE_FAILED = exports.UPDATE_FAILED = 'CREATE_FAILED';

var initState = {
  isUpdating: false,
  updateError: null
};

var mutations = exports.mutations = (_mutations = {}, _defineProperty(_mutations, UPDATE_START, function (state) {
  (0, _lodash.assign)(state, {
    isUpdating: true,
    updateError: null
  });
}), _defineProperty(_mutations, UPDATE_SUCCESS, function (state) {
  (0, _lodash.assign)(state, {
    isUpdating: false,
    updateError: null
  });
}), _defineProperty(_mutations, UPDATE_FAILED, function (state, _ref) {
  var error = _ref.error;

  (0, _lodash.assign)(state, {
    isUpdating: false,
    updateError: error
  });
}), _mutations);

var buildActions = function buildActions(_ref2) {
  var entity = _ref2.entity,
      reqOpts = _ref2.request,
      afterUpdate = _ref2.afterUpdate;
  return {
    update: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(store, _ref3) {
        var id = _ref3.id,
            data = _ref3.data;
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                store.commit(UPDATE_START);

                _context.prev = 1;
                _context.next = 4;
                return entity.api.update(id, _extends({}, reqOpts, {
                  data: data
                }));

              case 4:
                response = _context.sent;


                store.commit('entities/MERGE', {
                  name: entity.name,
                  schema: entity.normalizrSchema,
                  data: response.data
                }, { root: true });

                store.commit(UPDATE_SUCCESS);

                if (afterUpdate) afterUpdate(store, { data: response.data, entity: entity });
                _context.next = 15;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](1);

                console.error(_context.t0); // eslint-disable-line

                store.commit(UPDATE_FAILED, { error: _context.t0 });

                return _context.abrupt('return', Promise.reject(_context.t0));

              case 15:
                return _context.abrupt('return', Promise.resolve());

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 10]]);
      }));

      function update(_x, _x2) {
        return _ref4.apply(this, arguments);
      }

      return update;
    }()
  };
};

exports.default = function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!opts.entity) throw new Error('You have to specify an Entity');

  return {
    state: initState,
    mutations: mutations,
    actions: buildActions(opts)
  };
};