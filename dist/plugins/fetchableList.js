var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { omit, assign, defaults } from 'lodash';

const FETCH_START = 'FETCH_START';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILED = 'FETCH_FAILED';
const ADD_FILTER = 'ADD_FILTER';
const CLEAR_FILTERS = 'CLEAR_FILTERS';
const MERGE_FILTERS = 'MERGE_FILTERS';

const initState = {
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

const mutations = {
  [FETCH_START](state, _ref = {}) {
    let { page = 1 } = _ref,
        meta = {} = _objectWithoutProperties(_ref, ['page']);

    assign(state, _extends({
      isFetching: true,
      fetchError: null,
      ids: page !== 1 ? state.ids : []
    }, meta));
  },

  [FETCH_SUCCESS](state, {
    ids,
    pagination = {
      page: 1,
      perPage: 1,
      total: 1
    }
  }) {
    assign(state, {
      isFetching: false,
      fetchError: null,
      ids: [...state.ids, ...ids],
      pagination
    });
  },

  [FETCH_FAILED](state, { error }) {
    assign(state, {
      isFetching: false,
      fetchError: error
    });
  },

  [ADD_FILTER](state, filter) {
    assign(state, {
      filters: _extends({}, state.filters, filter)
    });
  },

  [CLEAR_FILTERS](state) {
    assign(state, { filters: {} });
  },

  [MERGE_FILTERS](state, filters) {
    assign(state, {
      filters: _extends({}, state.filters, filters)
    });
  }
};

export { mutations };
const buildActions = (entity, opts = {}) => ({
  fetch({ commit, state }, params = {}) {
    return _asyncToGenerator(function* () {
      const finalParams = defaults(params, _extends({
        page: 1,
        perPage: 15
      }, state.filters));

      commit(FETCH_START, { page: params.page });

      try {
        const { data, pagination } = yield entity.api.all(_extends({
          params: finalParams
        }, opts.requestOptions));

        commit('entities/MERGE', {
          name: entity.name,
          schema: entity.normalizrSchema,
          data
        }, { root: true });

        commit(FETCH_SUCCESS, {
          ids: data.map(function (body) {
            return body.id;
          }),
          pagination
        });
      } catch (error) {
        console.error(error); // eslint-disable-line
        commit(FETCH_FAILED, { error });

        return Promise.reject(error);
      }

      return Promise.resolve();
    })();
  },

  fetchNextPage({ state, dispatch }, params = {}) {
    return _asyncToGenerator(function* () {
      yield dispatch('fetch', _extends({}, params, {
        page: state.pagination.page + 1
      }));
    })();
  },

  addFilter({ commit }, filter) {
    commit(ADD_FILTER, filter);
  },

  clearFilters({ commit }) {
    commit(CLEAR_FILTERS);
  },

  mergeFilters({ commit }, filters) {
    commit(MERGE_FILTERS, filters);
  }
});

const buildGetters = entity => ({
  all: (state, getters, rState, rGetters) => rGetters['entities/byIds'](state.ids, entity.name, entity.normalizrSchema),

  currentPage: ({ pagination: { page } }) => page,

  pagesCount: ({ pagination: { perPage, total } }) => perPage > 0 ? Math.ceil(total / perPage) : 1, // eslint-disable-line

  hasMorePages: (state, { currentPage, pagesCount }) => currentPage >= 1 && currentPage < pagesCount
});

export default ((opts = {}) => {
  if (!opts.entity) throw new Error('You have to specify an Entity');

  return {
    state: initState,
    mutations,
    actions: buildActions(opts.entity, omit(opts, ['entity'])),
    getters: buildGetters(opts.entity)
  };
});