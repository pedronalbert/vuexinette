import { assign, defaults } from 'lodash';

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
    total: 0,
  },
  filters: {},
};

export const mutations = {
  [FETCH_START](state, { page = 1, ...meta = {} } = {}) {
    assign(state, {
      isFetching: true,
      fetchError: null,
      ids: page !== 1 ? state.ids : [],
      ...meta,
    });
  },

  [FETCH_SUCCESS](state, {
    ids,
    pagination = {
      page: 1,
      perPage: 1,
      total: 1,
    },
  }) {
    assign(state, {
      isFetching: false,
      fetchError: null,
      ids: [...state.ids, ...ids],
      pagination,
    });
  },

  [FETCH_FAILED](state, { error }) {
    assign(state, {
      isFetching: false,
      fetchError: error,
    });
  },

  [ADD_FILTER](state, filter) {
    assign(state, {
      filters: {
        ...state.filters,
        ...filter,
      },
    });
  },

  [CLEAR_FILTERS](state) {
    assign(state, { filters: {} });
  },

  [MERGE_FILTERS](state, filters) {
    assign(state, {
      filters: {
        ...state.filters,
        ...filters,
      },
    });
  },
};

const buildActions = ({ entity, request: reqOpts }) => ({
  async fetch({ commit, state }, params = {}) {
    const finalParams = defaults(params, {
      page: 1,
      perPage: 15,
      ...state.filters,
    });

    commit(FETCH_START, { page: params.page });

    try {
      const { data, pagination } = await entity.api.all({
        params: finalParams,
        ...reqOpts,
      });

      commit('entities/MERGE', {
        name: entity.name,
        schema: entity.normalizrSchema,
        data,
      }, { root: true });

      commit(FETCH_SUCCESS, {
        ids: data.map(body => body.id),
        pagination,
      });
    } catch (error) {
      console.error(error); // eslint-disable-line
      commit(FETCH_FAILED, { error });

      return Promise.reject(error);
    }

    return Promise.resolve();
  },

  async fetchNextPage({ state, dispatch }, params = {}) {
    await dispatch('fetch', {
      ...params,
      page: state.pagination.page + 1,
    });
  },

  addFilter({ commit }, filter) {
    commit(ADD_FILTER, filter);
  },

  clearFilters({ commit }) {
    commit(CLEAR_FILTERS);
  },

  mergeFilters({ commit }, filters) {
    commit(MERGE_FILTERS, filters);
  },
});

const buildGetters = ({ entity }) => ({
  all: (state, getters, rState, rGetters) => rGetters['entities/byIds'](
    state.ids,
    entity.name,
    entity.normalizrSchema,
  ),

  currentPage: ({ pagination: { page } }) => page,

  pagesCount: ({ pagination: { perPage, total } }) => perPage > 0 ?  Math.ceil((total / perPage)) : 1, // eslint-disable-line

  hasMorePages: (state, { currentPage, pagesCount }) => currentPage >= 1 &&
    currentPage < pagesCount,
});

export default (opts = {}) => {
  if (!opts.entity) throw new Error('You have to specify an Entity');

  return {
    state: initState,
    mutations,
    actions: buildActions(opts),
    getters: buildGetters(opts),
  };
};
