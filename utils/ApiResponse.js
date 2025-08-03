class ApiResponse {
  constructor(statusCode = 200, message, data = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode >= 200 && statusCode < 300;
    if (data) this.data = data;
  }
}

module.exports = ApiResponse;
