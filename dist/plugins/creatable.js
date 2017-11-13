var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { assign } from 'lodash';

const CREATE_START = 'CREATE_START';
const CREATE_SUCCESS = 'CREATE_SUCCESS';
const CREATE_FAILED = 'CREATE_FAILED';

const initState = {
  isCreating: false,
  createError: null
};

export const mutations = {
  [CREATE_START](state) {
    assign(state, {
      isCreating: true,
      createError: null
    });
  },

  [CREATE_SUCCESS](state) {
    assign(state, {
      isCreating: false,
      createError: null
    });
  },

  [CREATE_FAILED](state, { error }) {
    assign(state, {
      isCreating: false,
      createError: error
    });
  }
};

const buildActions = ({ entity, request: reqOpts }) => ({
  create({ commit }, formData) {
    return _asyncToGenerator(function* () {
      commit(CREATE_START);

      try {
        const { data } = yield entity.api.create(_extends({}, reqOpts, {
          data: formData
        }));

        commit(CREATE_SUCCESS, { id: data.id });
      } catch (error) {
        console.error(error); // eslint-disable-line

        commit(CREATE_FAILED, { error });

        return Promise.reject(error);
      }

      return Promise.resolve();
    })();
  }
});

export default ((opts = {}) => {
  if (!opts.entity) throw new Error('You have to specify an Entity');

  return {
    state: initState,
    mutations,
    actions: buildActions(opts)
  };
});