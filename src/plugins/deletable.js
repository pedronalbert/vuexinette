import { assign } from 'lodash';

const initState = {};

export const mutations = {};

const buildActions = ({
  entity,
  request: reqOpts,
  afterDelete,
}) => ({
  async delete(store, id) {
    try {
      const { data } = await entity.api.delete(id, {
        ...reqOpts,
      });

      if (afterDelete) afterDelete(store, { id });
    } catch (error) {
      console.error(error); // eslint-disable-line

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
