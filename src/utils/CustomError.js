class CustomError extends Error {
  message;
  statusCode;
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default CustomError;
