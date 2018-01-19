import Vue from 'vue';
import { get, isArray, defaultsDeep, assign, each } from 'lodash';
import { denormalize, normalize } from 'normalizr';

export const MERGE = 'MERGE';
export const DELETE = 'DELETE';
export const ADD_RELATION_ID = 'ADD_RELATION_ID';

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

    [ADD_RELATION_ID](state, { path, id, type = 'push' }) {
      let newRelations = id;

      const relation = get(state, path);

      if (isArray(relation)) newRelations = (type === 'push') ? relation.push(id) : relation.unshift(id);

      Vue.set(state, path, newRelations)
    },
  },
};
