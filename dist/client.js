'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _humps = require('humps');

var _humps2 = _interopRequireDefault(_humps);

var _exceptions = require('./exceptions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_CONFIG = {
  transformResponse: function transformResponse(data) {
    return _humps2.default.camelizeKeys(JSON.parse(data));
  },
  timeout: 10000
};

var client = _axios2.default.create(DEFAULT_CONFIG);

var parsePaginationHeaders = function parsePaginationHeaders(headers) {
  return {
    total: parseInt(headers.total, 10) || 1,
    perPage: parseInt(headers['per-page'], 10) || 0
  };
};

var responseErrorInterceptor = function responseErrorInterceptor(err) {
  var rejectError = new _exceptions.RequestError('RequestError: ' + err.message, null);

  if (err.response) {
    var _err$response = err.response,
        status = _err$response.status,
        data = _err$response.data;

    var message = (0, _lodash.get)(data, 'error');

    if (status === 404) rejectError = new _exceptions.NotFoundError(message, status);else if (status === 403) rejectError = new _exceptions.ForbiddenError(message, status);else if (status === 402) rejectError = new _exceptions.UnprocessableEntityError(message, status);else rejectError = new _exceptions.ServerError(message, 500);
  }

  return Promise.reject(rejectError);
};

var responseInterceptor = function responseInterceptor(res) {
  if ((0, _lodash.has)(res, 'headers.total')) {
    (0, _lodash.assign)(res, {
      pagination: _extends({
        page: (0, _lodash.get)(res.config, 'params.page', 1)
      }, parsePaginationHeaders(res.headers))
    });
  }

  return res;
};

client.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

var setHeaders = function setHeaders(headers) {
  (0, _lodash.merge)(client.defaults.headers, headers);
};

var setConfig = function setConfig(config) {
  (0, _lodash.merge)(client.defaults, config);
};

exports.default = {
  config: setConfig,

  headers: setHeaders,

  request: function request(config) {
    var reqConfig = (0, _lodash.extend)(config, {
      params: _humps2.default.decamelizeKeys(config.params),
      data: _humps2.default.decamelizeKeys(config.data)
    });

    return client.request(reqConfig);
  }
};