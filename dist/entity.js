var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { schema } from 'normalizr';
import { pick, compact, defaults, isArray, each } from 'lodash';
import client from './client';

const buildNormalizrSchema = (entityName, bareSchema = {}) => {
  const objSchema = {};

  each(bareSchema, (value, key) => {
    objSchema[key] = isArray(value) ? [value[0].normalizrSchema] : value.normalizrSchema;
  });

  return new schema.Entity(entityName, objSchema);
};

const FILLABLE_OPTS_KEYS = ['url', 'params', 'data', 'baseURL'];

const buildApi = url => ({
  all: (() => {
    var _ref = _asyncToGenerator(function* (opts = {}) {
      return client.request(_extends({
        method: 'GET',
        url
      }, pick(opts, FILLABLE_OPTS_KEYS)));
    });

    return function all() {
      return _ref.apply(this, arguments);
    };
  })(),

  get: (() => {
    var _ref2 = _asyncToGenerator(function* (id, opts = {}) {
      return client.request(_extends({
        method: 'GET',
        url: compact([url, id, opts.action]).join('/')
      }, pick(opts, FILLABLE_OPTS_KEYS)));
    });

    return function get(_x) {
      return _ref2.apply(this, arguments);
    };
  })(),

  create: (() => {
    var _ref3 = _asyncToGenerator(function* (opts = {}) {
      return client.request(_extends({
        method: 'POST',
        url
      }, pick(opts, FILLABLE_OPTS_KEYS)));
    });

    return function create() {
      return _ref3.apply(this, arguments);
    };
  })(),

  update: (() => {
    var _ref4 = _asyncToGenerator(function* (id, opts = {}) {
      return client.request(_extends({
        method: 'PUT',
        url: `${url}/${id}`
      }, pick(opts, FILLABLE_OPTS_KEYS)));
    });

    return function update(_x2) {
      return _ref4.apply(this, arguments);
    };
  })(),

  delete: (() => {
    var _ref5 = _asyncToGenerator(function* (id, opts = {}) {
      return client.request(_extends({
        method: 'DELETE',
        url: `${url}/${id}`
      }, pick(opts, FILLABLE_OPTS_KEYS)));
    });

    return function _delete(_x3) {
      return _ref5.apply(this, arguments);
    };
  })()
});

export default function Entity(o) {
  if (!o.name) throw Error('You must specify a entity name');

  const opts = defaults(o, {
    url: `/${o.name}`
  });

  const normalizrSchema = buildNormalizrSchema(opts.name, opts.schema);

  return _extends({}, opts, {
    normalizrSchema,
    api: buildApi(opts.url)
  });
}