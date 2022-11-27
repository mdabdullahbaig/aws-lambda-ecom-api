class ResponseHandler {
  // private field
  #response;
  constructor(response) {
    this.#response = response;
  }
  // static method
  static create(requestHandlerResponse) {
    try {
      return new ResponseHandler(requestHandlerResponse);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  translator() {
    const responseBody = {
      data: null,
      message: "success",
    };

    responseBody.data = {
      message: this.#response?.message,
      jwt_token: this.#response?.jwtToken,
    };

    return responseBody;
  }
}

export default ResponseHandler;
