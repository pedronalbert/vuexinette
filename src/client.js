import { extend, assign, has, get, merge } from 'lodash';
import axios from 'axios';
import humps from 'humps';

import {
  RequestError,
  NotFoundError,
  ForbiddenError,
  UnprocessableEntityError,
  ServerError,
} from './exceptions';

const DEFAULT_CONFIG = {
  transformResponse: data => humps.camelizeKeys(JSON.parse(data)),
  timeout: 10000,
};

const client = axios.create(DEFAULT_CONFIG);

const parsePaginationHeaders = headers => ({
  total: parseInt(headers.total, 10) || 1,
  perPage: parseInt(headers['per-page'], 10) || 0,
});

const responseErrorInterceptor = (err) => {
  let rejectError = new RequestError('Request Error', null);

  if (err.response) {
    const { status, data } = err.response;
    const message = get(data, 'error');

    if (status === 404) rejectError = new NotFoundError(message, status);
    else if (status === 403) rejectError = new ForbiddenError(message, status);
    else if (status === 402) rejectError = new UnprocessableEntityError(message, status);
    else rejectError = new ServerError(message, 500);
  }

  return Promise.reject(rejectError);
};

const responseInterceptor = (res) => {
  if (has(res, 'headers.total')) {
    assign(res, {
      pagination: {
        page: get(res.config, 'params.page', 1),
        ...parsePaginationHeaders(res.headers),
      },
    });
  }

  return res;
};

client.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor,
);

const setHeaders = (headers) => {
  merge(client.defaults.headers, headers);
};

const setConfig = (config) => {
  merge(client.defaults, config);
};

export default {
  config: setConfig,

  headers: setHeaders,

  request(config) {
    const reqConfig = extend(config, {
      params: humps.decamelizeKeys(config.params),
      data: humps.decamelizeKeys(config.data),
    });

    return client.request(reqConfig);
  },
};
