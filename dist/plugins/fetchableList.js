'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mutations = exports.PREPEND_ID = exports.APPEND_ID = undefined;

var _mutations;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FETCH_START = 'FETCH_START';
var FETCH_SUCCESS = 'FETCH_SUCCESS';
var FETCH_FAILED = 'FETCH_FAILED';
var ADD_FILTER = 'ADD_FILTER';
var CLEAR_FILTERS = 'CLEAR_FILTERS';
var MERGE_FILTERS = 'MERGE_FILTERS';
var APPEND_ID = exports.APPEND_ID = 'APPEND_ID';
var PREPEND_ID = exports.PREPEND_ID = 'PREPEND_ID';

var initState = {
  isFetching: false,
  fetchError: null,
  ids: [],
  pagination: {
    page: 0,
    perPage: 0,
    total: 0
  },
  filters: {}
};

var mutations = (_mutations = {}, _defineProperty(_mutations, FETCH_START, function (state) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$page = _ref.page,
      page = _ref$page === undefined ? 1 : _ref$page,
      _objectWithoutPropert = _objectWithoutProperties(_ref, ['page']),
      _objectWithoutPropert2 = _objectWithoutPropert,
      meta = _objectWithoutPropert2 === undefined ? {} : _objectWithoutPropert2;

  (0, _lodash.assign)(state, _extends({
    isFetching: true,
    fetchError: null,
    ids: page !== 1 ? state.ids : []
  }, meta));
}), _defineProperty(_mutations, FETCH_SUCCESS, function (state, _ref2) {
  var ids = _ref2.ids,
      _ref2$pagination = _ref2.pagination,
      pagination = _ref2$pagination === undefined ? {
    page: 1,
    perPage: 1,
    total: 1
  } : _ref2$pagination;

  (0, _lodash.assign)(state, {
    isFetching: false,
    fetchError: null,
    ids: [].concat(_toConsumableArray(state.ids), _toConsumableArray(ids)),
    pagination: pagination
  });
}), _defineProperty(_mutations, FETCH_FAILED, function (state, _ref3) {
  var error = _ref3.error;

  (0, _lodash.assign)(state, {
    isFetching: false,
    fetchError: error
  });
}), _defineProperty(_mutations, ADD_FILTER, function (state, filter) {
  (0, _lodash.assign)(state, {
    filters: _extends({}, state.filters, filter)
  });
}), _defineProperty(_mutations, PREPEND_ID, function (state, _ref4) {
  var id = _ref4.id;

  state.ids.unshift(id);
}), _defineProperty(_mutations, APPEND_ID, function (state, _ref5) {
  var id = _ref5.id;

  state.ids.push(id);
}), _defineProperty(_mutations, CLEAR_FILTERS, function (state) {
  (0, _lodash.assign)(state, { filters: {} });
}), _defineProperty(_mutations, MERGE_FILTERS, function (state, filters) {
  (0, _lodash.assign)(state, {
    filters: _extends({}, state.filters, filters)
  });
}), _mutations);

exports.mutations = mutations;
var buildActions = function buildActions(_ref6) {
  var entity = _ref6.entity,
      reqOpts = _ref6.request;
  return {
    fetch: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref7) {
        var commit = _ref7.commit,
            state = _ref7.state;
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var finalParams, _ref9, data, pagination;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                finalParams = (0, _lodash.defaults)(params, _extends({
                  page: 1,
                  perPage: 15
                }, state.filters));


                commit(FETCH_START, { page: params.page });

                _context.prev = 2;
                _context.next = 5;
                return entity.api.all(_extends({
                  params: finalParams
                }, reqOpts));

              case 5:
                _ref9 = _context.sent;
                data = _ref9.data;
                pagination = _ref9.pagination;


                commit('entities/MERGE', {
                  name: entity.name,
                  schema: entity.normalizrSchema,
                  data: data
                }, { root: true });

                commit(FETCH_SUCCESS, {
                  ids: data.map(function (body) {
                    return body.id;
                  }),
                  pagination: pagination
                });
                _context.next = 17;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context['catch'](2);

                console.error(_context.t0); // eslint-disable-line
                commit(FETCH_FAILED, { error: _context.t0 });

                return _context.abrupt('return', Promise.reject(_context.t0));

              case 17:
                return _context.abrupt('return', Promise.resolve());

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 12]]);
      }));

      function fetch(_x3) {
        return _ref8.apply(this, arguments);
      }

      return fetch;
    }(),
    fetchNextPage: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref10) {
        var state = _ref10.state,
            dispatch = _ref10.dispatch;
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return dispatch('fetch', _extends({}, params, {
                  page: state.pagination.page + 1
                }));

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchNextPage(_x5) {
        return _ref11.apply(this, arguments);
      }

      return fetchNextPage;
    }(),
    addFilter: function addFilter(_ref12, filter) {
      var commit = _ref12.commit;

      commit(ADD_FILTER, filter);
    },
    clearFilters: function clearFilters(_ref13) {
      var commit = _ref13.commit;

      commit(CLEAR_FILTERS);
    },
    mergeFilters: function mergeFilters(_ref14, filters) {
      var commit = _ref14.commit;

      commit(MERGE_FILTERS, filters);
    }
  };
};

var buildGetters = function buildGetters(_ref15) {
  var entity = _ref15.entity;
  return {
    all: function all(state, getters, rState, rGetters) {
      return rGetters['entities/byIds'](state.ids, entity.name, entity.normalizrSchema);
    },

    currentPage: function currentPage(_ref16) {
      var page = _ref16.pagination.page;
      return page;
    },

    pagesCount: function pagesCount(_ref17) {
      var _ref17$pagination = _ref17.pagination,
          perPage = _ref17$pagination.perPage,
          total = _ref17$pagination.total;
      return perPage > 0 ? Math.ceil(total / perPage) : 1;
    }, // eslint-disable-line

    hasMorePages: function hasMorePages(state, _ref18) {
      var currentPage = _ref18.currentPage,
          pagesCount = _ref18.pagesCount;
      return currentPage >= 1 && currentPage < pagesCount;
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