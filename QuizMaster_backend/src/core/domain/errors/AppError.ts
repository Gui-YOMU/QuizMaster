interface ErrorParams {
  statusCode: number;
  message: string;
}

export class AppError extends Error {
  public statusCode: number;

  constructor({ statusCode, message }: ErrorParams) {
    super(message);
    this.statusCode = statusCode;
  }
}
