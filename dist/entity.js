var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { schema } from 'normalizr';
import { compact, defaults, isArray, each } from 'lodash';
import client from './client';

const buildNormalizrSchema = (entityName, bareSchema = {}) => {
  const objSchema = {};

  each(bareSchema, (value, key) => {
    objSchema[key] = isArray(value) ? [value[0].normalizrSchema] : value.normalizrSchema;
  });

  return new schema.Entity(entityName, objSchema);
};

const buildApi = url => ({
  all: (() => {
    var _ref = _asyncToGenerator(function* (params) {
      return client.request({ method: 'GET', url, params });
    });

    return function all(_x) {
      return _ref.apply(this, arguments);
    };
  })(),

  get: (() => {
    var _ref2 = _asyncToGenerator(function* (id, params = {}, config = {}) {
      return client.request({
        method: 'GET',
        url: compact([url, id, config.action]).join('/'),
        params
      });
    });

    return function get(_x2) {
      return _ref2.apply(this, arguments);
    };
  })(),

  create: (() => {
    var _ref3 = _asyncToGenerator(function* (data) {
      return client.request({
        method: 'POST',
        url,
        data
      });
    });

    return function create(_x3) {
      return _ref3.apply(this, arguments);
    };
  })(),

  update: (() => {
    var _ref4 = _asyncToGenerator(function* (id, data) {
      return client.request({
        method: 'PUT',
        url: `${url}/${id}`,
        data
      });
    });

    return function update(_x4, _x5) {
      return _ref4.apply(this, arguments);
    };
  })(),

  delete: (() => {
    var _ref5 = _asyncToGenerator(function* (id) {
      return client.request({
        method: 'DELETE',
        url: `${url}/${id}`
      });
    });

    return function _delete(_x6) {
      return _ref5.apply(this, arguments);
    };
  })()
});

export default function Entity(o) {
  if (!o.name) throw Error('You must specify a entity name');

  const opts = defaults(o, {
    URL: `/${o.name}`
  });

  const normalizrSchema = buildNormalizrSchema(opts.name, opts.schema);

  return _extends({}, opts, {
    normalizrSchema,
    api: buildApi(opts.url || `/${opts.name}`)
  });
}