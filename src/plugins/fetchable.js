import { pick, assign } from 'lodash';

const FETCH_START = 'FETCH_START';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILED = 'FETCH_FAILED';

const initState = {
  isFetching: false,
  fetchError: null,
  lastFetch: null,
  id: null,
};

export const mutations = {
  [FETCH_START](state) {
    assign(state, {
      isFetching: true,
      fetchError: null,
    });
  },

  [FETCH_SUCCESS](state, { id }) {
    assign(state, {
      isFetching: false,
      fetchError: null,
      lastFetch: new Date().toString(),
      id,
    });
  },

  [FETCH_FAILED](state, { error }) {
    assign(state, {
      isFetching: false,
      fetchError: error,
    });
  },
};

const buildActions = ({ entity, request: reqOpts }) => ({
  async fetch({ commit }, { id, params }) {
    if (!id) throw new Error('You need to pass an id');

    commit(FETCH_START);

    try {
      const { data } = await entity.api.get(id, {
        params,
        ...reqOpts,
      });

      commit('entities/MERGE', {
        name: entity.name,
        schema: entity.normalizrSchema,
        data,
      }, { root: true });

      if (!data.id) throw new Error('response does not have an id');

      commit(FETCH_SUCCESS, { id: data.id });
    } catch (error) {
      console.error(error); // eslint-disable-line
      commit(FETCH_FAILED, { error });

      return Promise.reject(error);
    }

    return Promise.resolve();
  },
});

const buildGetters = ({ entity }) => ({
  data: (state, getters, rState, rGetters) => rGetters['entities/byId'](
    state.id,
    entity.name,
    entity.normalizrSchema,
  ),
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
