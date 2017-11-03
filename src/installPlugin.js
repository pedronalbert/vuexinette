import { get, merge } from 'lodash';

export default (module, plugin, opts = {}) => {
  const attrs = plugin(opts);

  merge(module, {
    state: get(attrs, 'state', {}),
    mutations: get(attrs, 'mutations', {}),
    actions: {
      ...get(attrs, 'actions', {}),
      ...module.actions,
    },
    getters: {
      ...get(attrs, 'getters', {}),
      ...module.getters,
    },
  });
};
