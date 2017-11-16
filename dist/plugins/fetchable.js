'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mutations = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mutations;

var _lodash = require('lodash');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FETCH_START = 'FETCH_START';
var FETCH_SUCCESS = 'FETCH_SUCCESS';
var FETCH_FAILED = 'FETCH_FAILED';

var initState = {
  isFetching: false,
  fetchError: null,
  lastFetch: null,
  id: null
};

var mutations = exports.mutations = (_mutations = {}, _defineProperty(_mutations, FETCH_START, function (state) {
  (0, _lodash.assign)(state, {
    isFetching: true,
    fetchError: null
  });
}), _defineProperty(_mutations, FETCH_SUCCESS, function (state, _ref) {
  var id = _ref.id;

  (0, _lodash.assign)(state, {
    isFetching: false,
    fetchError: null,
    lastFetch: new Date().toString(),
    id: id
  });
}), _defineProperty(_mutations, FETCH_FAILED, function (state, _ref2) {
  var error = _ref2.error;

  (0, _lodash.assign)(state, {
    isFetching: false,
    fetchError: error
  });
}), _mutations);

var buildActions = function buildActions(_ref3) {
  var entity = _ref3.entity,
      reqOpts = _ref3.request;
  return {
    fetch: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref4, _ref5) {
        var commit = _ref4.commit;
        var id = _ref5.id,
            params = _ref5.params;

        var _ref7, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (id) {
                  _context.next = 2;
                  break;
                }

                throw new Error('You need to pass an id');

              case 2:

                commit(FETCH_START);

                _context.prev = 3;
                _context.next = 6;
                return entity.api.get(id, _extends({
                  params: params
                }, reqOpts));

              case 6:
                _ref7 = _context.sent;
                data = _ref7.data;


                commit('entities/MERGE', {
                  name: entity.name,
                  schema: entity.normalizrSchema,
                  data: data
                }, { root: true });

                if (data.id) {
                  _context.next = 11;
                  break;
                }

                throw new Error('response does not have an id');

              case 11:

                commit(FETCH_SUCCESS, { id: data.id });
                _context.next = 19;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context['catch'](3);

                console.error(_context.t0); // eslint-disable-line
                commit(FETCH_FAILED, { error: _context.t0 });

                return _context.abrupt('return', Promise.reject(_context.t0));

              case 19:
                return _context.abrupt('return', Promise.resolve());

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 14]]);
      }));

      function fetch(_x, _x2) {
        return _ref6.apply(this, arguments);
      }

      return fetch;
    }()
  };
};

var buildGetters = function buildGetters(_ref8) {
  var entity = _ref8.entity;
  return {
    data: function data(state, getters, rState, rGetters) {
      return rGetters['entities/byId'](state.id, entity.name, entity.normalizrSchema);
    }
  };
};

exports.default = function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!opts.entity) throw new Error('You have to specify an Entity');

  return {
    state: initState,
    mutations: mutations,
    actions: buildActions(opts),
    getters: buildGetters(opts)
  };
};