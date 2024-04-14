import { HandlerResponse } from '@netlify/functions';

abstract class FunctionsResponse {
  abstract statusCode: number;

  constructor(private body: {}) {}

  get(): HandlerResponse {
    return {
      body: JSON.stringify(this.body),
      statusCode: this.statusCode,
    };
  }
}

export class SuccessResponse extends FunctionsResponse {
  statusCode = 200;
}

export abstract class ErrorResponse extends FunctionsResponse {
  constructor(message: string) {
    super({ message });
  }
}

export class BadRequestError extends ErrorResponse {
  statusCode = 400;

  static missingQuery() {
    return new BadRequestError('Missing mandatory query params in request');
  }
}

export class InfiniteLoopError extends ErrorResponse {
  statusCode = 429;

  constructor() {
    super('Infinite loop happened');
  }
}

export class UnauthorizedRequestError extends ErrorResponse {
  statusCode = 401;
}
