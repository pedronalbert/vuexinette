var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }return step("next");
    });
  };
}

import { pick, assign, omit } from 'lodash';

const FETCH_START = 'FETCH_START';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILED = 'FETCH_FAILED';

const initState = {
  isFetching: false,
  fetchError: null,
  lastFetch: null,
  id: null
};

export const mutations = {
  [FETCH_START](state) {
    assign(state, {
      isFetching: true,
      fetchError: null
    });
  },

  [FETCH_SUCCESS](state, { id }) {
    assign(state, {
      isFetching: false,
      fetchError: null,
      lastFetch: new Date().toString(),
      id
    });
  },

  [FETCH_FAILED](state, { error }) {
    assign(state, {
      isFetching: false,
      fetchError: error
    });
  }
};

const buildActions = (entity, opts = {}) => ({
  fetch({ commit }, { id, params }) {
    return _asyncToGenerator(function* () {
      if (!id) throw new Error('You need to pass an id');

      commit(FETCH_START);

      try {
        const { data } = yield entity.api.get(id, _extends({
          params
        }, opts.requestOptions));

        commit('entities/MERGE', {
          name: entity.name,
          schema: entity.normalizrSchema,
          data
        }, { root: true });

        if (!data.id) throw new Error('response does not have an id');

        commit(FETCH_SUCCESS, { id: data.id });
      } catch (error) {
        console.error(error); // eslint-disable-line
        commit(FETCH_FAILED, { error });

        return Promise.reject(error);
      }

      return Promise.resolve();
    })();
  }
});

const buildGetters = entity => ({
  data: (state, getters, rState, rGetters) => rGetters['entities/byId'](state.id, entity.name, entity.normalizrSchema)
});

export default ((opts = {}) => {
  if (!opts.entity) throw new Error('You have to specify an Entity');

  return {
    state: initState,
    mutations,
    actions: buildActions(opts.entity, omit(opts, ['entity'])),
    getters: buildGetters(opts.entity)
  };
});