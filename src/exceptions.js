import ExtendableError from 'es6-error';

class BasicException extends ExtendableError {
  constructor(message = 'Can\'t perform this operation', code) {
    super(message);

    this.code = code;
  }
}

export class ForbiddenError extends BasicException {}
export class NotFoundError extends BasicException {}
export class RequestError extends BasicException {}
export class ServerError extends BasicException {}
export class UnprocessableEntityError extends BasicException {}
