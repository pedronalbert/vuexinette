'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mutations = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mutations;

var _lodash = require('lodash');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CREATE_START = 'CREATE_START';
var CREATE_SUCCESS = 'CREATE_SUCCESS';
var CREATE_FAILED = 'CREATE_FAILED';

var initState = {
  isCreating: false,
  createError: null
};

var mutations = exports.mutations = (_mutations = {}, _defineProperty(_mutations, CREATE_START, function (state) {
  (0, _lodash.assign)(state, {
    isCreating: true,
    createError: null
  });
}), _defineProperty(_mutations, CREATE_SUCCESS, function (state) {
  (0, _lodash.assign)(state, {
    isCreating: false,
    createError: null
  });
}), _defineProperty(_mutations, CREATE_FAILED, function (state, _ref) {
  var error = _ref.error;

  (0, _lodash.assign)(state, {
    isCreating: false,
    createError: error
  });
}), _mutations);

var buildActions = function buildActions(_ref2) {
  var entity = _ref2.entity,
      reqOpts = _ref2.request;
  return {
    create: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref3, formData) {
        var commit = _ref3.commit;

        var _ref5, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                commit(CREATE_START);

                _context.prev = 1;
                _context.next = 4;
                return entity.api.create(_extends({}, reqOpts, {
                  data: formData
                }));

              case 4:
                _ref5 = _context.sent;
                data = _ref5.data;


                commit(CREATE_SUCCESS, { id: data.id });
                _context.next = 14;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](1);

                console.error(_context.t0); // eslint-disable-line

                commit(CREATE_FAILED, { error: _context.t0 });

                return _context.abrupt('return', Promise.reject(_context.t0));

              case 14:
                return _context.abrupt('return', Promise.resolve());

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 9]]);
      }));

      function create(_x, _x2) {
        return _ref4.apply(this, arguments);
      }

      return create;
    }()
  };
};

exports.default = function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!opts.entity) throw new Error('You have to specify an Entity');

  return {
    state: initState,
    mutations: mutations,
    actions: buildActions(opts)
  };
};