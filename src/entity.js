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

const FILLABLE_OPTS_KEYS = [
  'url',
  'params',
  'data',
  'baseURL',
];

const buildApi = buildOpts => ({
  all: async (opts = {}) => client.request({
    method: 'GET',
    ...buildOpts,
    ...pick(opts, FILLABLE_OPTS_KEYS),
  }),

  get: async (id, opts = {}) => client.request({
    method: 'GET',
    url: compact([url, id, opts.action]).join('/'),
    ...buildOpts,
    ...pick(opts, FILLABLE_OPTS_KEYS),
  }),

  create: async (opts = {}) => client.request({
    method: 'POST',
    url,
    ...buildOpts,
    ...pick(opts, FILLABLE_OPTS_KEYS),
  }),

  update: async (id, opts = {}) => client.request({
    method: 'PUT',
    url: `${url}/${id}`,
    ...buildOpts,
    ...pick(opts, FILLABLE_OPTS_KEYS),
  }),

  delete: async (id, opts = {}) => client.request({
    method: 'DELETE',
    url: `${url}/${id}`,
    ...buildOpts,
    ...pick(opts, FILLABLE_OPTS_KEYS),
  }),
});

export default function Entity(o) {
  if (!o.name) throw Error('You must specify a entity name');

  const opts = defaults(o, {
    url: `/${o.name}`,
  });

  const normalizrSchema = buildNormalizrSchema(opts.name, opts.schema);

  return {
    ...opts,
    normalizrSchema,
    api: buildApi(pick(opts, ['url', 'baseURL'])),
  };
}

