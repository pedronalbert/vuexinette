'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mutations = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var initState = {};

var mutations = exports.mutations = {};

var buildActions = function buildActions(_ref) {
  var entity = _ref.entity,
      reqOpts = _ref.request,
      afterDelete = _ref.afterDelete;
  return {
    delete: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(store, _ref2) {
        var id = _ref2.id;

        var _ref4, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return entity.api.delete(id, _extends({}, reqOpts));

              case 3:
                _ref4 = _context.sent;
                data = _ref4.data;


                if (afterDelete) afterDelete(store, { id: id });
                _context.next = 12;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);

                console.error(_context.t0); // eslint-disable-line

                return _context.abrupt('return', Promise.reject(_context.t0));

              case 12:
                return _context.abrupt('return', Promise.resolve());

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function _delete(_x, _x2) {
        return _ref3.apply(this, arguments);
      }

      return _delete;
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