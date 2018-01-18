import { assign } from 'lodash';

export const CREATE_START = 'CREATE_START';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAILED = 'CREATE_FAILED';

const initState = {
  isCreating: false,
  createError: null,
};

export const mutations = {
  [CREATE_START](state) {
    assign(state, {
      isCreating: true,
      createError: null,
    });
  },

  [CREATE_SUCCESS](state) {
    assign(state, {
      isCreating: false,
      createError: null,
    });
  },

  [CREATE_FAILED](state, { error }) {
    assign(state, {
      isCreating: false,
      createError: error,
    });
  },
};

const buildActions = ({
  entity,
  request: reqOpts,
  afterCreate,
}) => ({
  async create(store, formData) {
    store.commit(CREATE_START);

    try {
      const { data } = await entity.api.create({
        ...reqOpts,
        data: formData,
      });

      store.commit('entities/MERGE', {
        name: entity.name,
        schema: entity.normalizrSchema,
        data,
      }, { root: true });

      store.commit(CREATE_SUCCESS);

      if (afterCreate) afterCreate(store, { data });
    } catch (error) {
      console.error(error); // eslint-disable-line

      store.commit(CREATE_FAILED, { error });

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
