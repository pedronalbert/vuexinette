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
  all: async params => client.request({ method: 'GET', url, params }),

  get: async (id, params = {}, config = {}) => client.request({
    method: 'GET',
    url: compact([url, id, config.action]).join('/'),
    params,
  }),

  create: async data => client.request({
    method: 'POST',
    url,
    data,
  }),

  update: async (id, data) => client.request({
    method: 'PUT',
    url: `${url}/${id}`,
    data,
  }),

  delete: async id => client.request({
    method: 'DELETE',
    url: `${url}/${id}`,
  }),
});

export default function Entity(o) {
  if (!o.name) throw Error('You must specify a entity name');

  const opts = defaults(o, {
    URL: `/${o.name}`,
  });

  const normalizrSchema = buildNormalizrSchema(opts.name, opts.schema);

  return {
    ...opts,
    normalizrSchema,
    api: buildApi(opts.url || `/${opts.name}`),
  };
}

