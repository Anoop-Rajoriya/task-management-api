class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = "Internal server error",
    errors = []
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError