var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { get, merge } from 'lodash';

export default ((module, plugin, opts = {}) => {
  const attrs = plugin(opts);

  merge(module, {
    state: get(attrs, 'state', {}),
    mutations: get(attrs, 'mutations', {}),
    actions: _extends({}, get(attrs, 'actions', {}), module.actions),
    getters: _extends({}, get(attrs, 'getters', {}), module.getters)
  });
});