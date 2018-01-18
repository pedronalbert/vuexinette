import Vue from 'vue';
import { get, isArray, defaultsDeep, assign, each } from 'lodash';
import { denormalize, normalize } from 'normalizr';

export const MERGE = 'MERGE';
export const DELETE = 'DELETE';
export const ADD_NESTED_RESOURCE = 'ADD_NESTED_RESOURCE';
export const REMOVE_NESTED_RESOURCE = 'REMOVE_NESTED_RESOURCE';

export default {
  namespaced: true,

  state: {},

  getters: {
    byIds: state => (ids, name, schema) => denormalize(
      { [name]: ids },
      { [name]: [schema] },
      state,
    )[name] || [],

    byId: state => (id, name, schema) => denormalize(
      { [name]: id },
      { [name]: schema },
      state,
    )[name] || null,
  },

  mutations: {
    [MERGE](state, { data, schema, name }) {
      const { entities } = normalize({
        [name]: data,
      }, {
        [name]: isArray(data) ? [schema] : schema,
      });

      each(entities, (data, key) => {
        Vue.set(state, key, {
          ...get(state, key, {}),
          ...data,
        });
      });
    },

    [DELETE](state, { entity, id }) {
      assign(state, {
        entity: {
          ...state.entity,
          [String(id)]: {
            ...state.entity[String(id)],
            isDeleted: true,
          },
        },
      });
    },
  },
};
