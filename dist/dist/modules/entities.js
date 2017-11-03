var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

import { isArray, defaultsDeep, assign } from 'lodash';
import { denormalize, normalize } from 'normalizr';

export const MERGE = 'MERGE';
export const DELETE = 'DELETE';
export const ADD_NESTED_RESOURCE = 'ADD_NESTED_RESOURCE';
export const REMOVE_NESTED_RESOURCE = 'REMOVE_NESTED_RESOURCE';

export default {
  namespaced: true,

  state: {},

  getters: {
    byIds: state => (ids, name, schema) => denormalize({ [name]: ids }, { [name]: [schema] }, state)[name] || [],

    byId: state => (id, name, schema) => denormalize({ [name]: id }, { [name]: schema }, state)[name] || null
  },

  mutations: {
    [MERGE](state, { data, schema }) {
      const { entities } = normalize({
        [name]: data
      }, {
        [name]: isArray(data) ? [schema] : schema
      });

      assign(state, defaultsDeep(entities, state));
    },

    [DELETE](state, { entity, id }) {
      assign(state, {
        entity: _extends({}, state.entity, {
          [String(id)]: _extends({}, state.entity[String(id)], {
            isDeleted: true
          })
        })
      });
    }
  }
};