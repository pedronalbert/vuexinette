'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnprocessableEntityError = exports.ServerError = exports.RequestError = exports.NotFoundError = exports.ForbiddenError = undefined;

var _es6Error = require('es6-error');

var _es6Error2 = _interopRequireDefault(_es6Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicException = function (_ExtendableError) {
  _inherits(BasicException, _ExtendableError);

  function BasicException() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Can\'t perform this operation';
    var code = arguments[1];

    _classCallCheck(this, BasicException);

    var _this = _possibleConstructorReturn(this, (BasicException.__proto__ || Object.getPrototypeOf(BasicException)).call(this, message));

    _this.code = code;
    return _this;
  }

  return BasicException;
}(_es6Error2.default);

var ForbiddenError = exports.ForbiddenError = function (_BasicException) {
  _inherits(ForbiddenError, _BasicException);

  function ForbiddenError() {
    _classCallCheck(this, ForbiddenError);

    return _possibleConstructorReturn(this, (ForbiddenError.__proto__ || Object.getPrototypeOf(ForbiddenError)).apply(this, arguments));
  }

  return ForbiddenError;
}(BasicException);

var NotFoundError = exports.NotFoundError = function (_BasicException2) {
  _inherits(NotFoundError, _BasicException2);

  function NotFoundError() {
    _classCallCheck(this, NotFoundError);

    return _possibleConstructorReturn(this, (NotFoundError.__proto__ || Object.getPrototypeOf(NotFoundError)).apply(this, arguments));
  }

  return NotFoundError;
}(BasicException);

var RequestError = exports.RequestError = function (_BasicException3) {
  _inherits(RequestError, _BasicException3);

  function RequestError() {
    _classCallCheck(this, RequestError);

    return _possibleConstructorReturn(this, (RequestError.__proto__ || Object.getPrototypeOf(RequestError)).apply(this, arguments));
  }

  return RequestError;
}(BasicException);

var ServerError = exports.ServerError = function (_BasicException4) {
  _inherits(ServerError, _BasicException4);

  function ServerError() {
    _classCallCheck(this, ServerError);

    return _possibleConstructorReturn(this, (ServerError.__proto__ || Object.getPrototypeOf(ServerError)).apply(this, arguments));
  }

  return ServerError;
}(BasicException);

var UnprocessableEntityError = exports.UnprocessableEntityError = function (_BasicException5) {
  _inherits(UnprocessableEntityError, _BasicException5);

  function UnprocessableEntityError() {
    _classCallCheck(this, UnprocessableEntityError);

    return _possibleConstructorReturn(this, (UnprocessableEntityError.__proto__ || Object.getPrototypeOf(UnprocessableEntityError)).apply(this, arguments));
  }

  return UnprocessableEntityError;
}(BasicException);