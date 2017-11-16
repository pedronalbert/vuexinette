import { get, merge } from 'lodash';

export default (module, plugin, opts = {}) => {
  const pluginModule = plugin(opts);

  merge(module, {
    state: get(pluginModule, 'state', {}),
    mutations: get(pluginModule, 'mutations', {}),
    actions: {
      ...get(pluginModule, 'actions', {}),
      ...module.actions,
    },
    getters: {
      ...get(pluginModule, 'getters', {}),
      ...module.getters,
    },
  });
};
