import { assign } from 'lodash';

export const UPDATE_START = 'CREATE_START';
export const UPDATE_SUCCESS = 'CREATE_SUCCESS';
export const UPDATE_FAILED = 'CREATE_FAILED';

const initState = {
  isUpdating: false,
  updateError: null,
};

export const mutations = {
  [UPDATE_START](state) {
    assign(state, {
      isUpdating: true,
      updateError: null,
    });
  },

  [UPDATE_SUCCESS](state) {
    assign(state, {
      isUpdating: false,
      updateError: null,
    });
  },

  [UPDATE_FAILED](state, { error }) {
    assign(state, {
      isUpdating: false,
      updateError: error,
    });
  },
};

const buildActions = ({
  entity,
  request: reqOpts,
  afterUpdate,
}) => ({
  async update(store, { id, data }) {
    store.commit(UPDATE_START);

    try {
      const response = await entity.api.update(id, {
        ...reqOpts,
        data,
      });

      store.commit('entities/MERGE', {
        name: entity.name,
        schema: entity.normalizrSchema,
        data: response.data,
      }, { root: true });

      store.commit(UPDATE_SUCCESS);

      if (afterUpdate) afterUpdate(store, { data: response.data, entity });
    } catch (error) {
      console.error(error); // eslint-disable-line

      store.commit(UPDATE_FAILED, { error });

      return Promise.reject(error);
    }

    return Promise.resolve();
  },
});

export default (opts = {}) => {
  if (!opts.entity) throw new Error('You have to specify an Entity');

  return {
    state: initState,
    mutations,
    actions: buildActions(opts),
  };
};
