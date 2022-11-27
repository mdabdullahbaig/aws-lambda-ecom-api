import { ApiAction } from "./constants.js";
import requestValidation from "./requestValidation.js";
import { login, register } from "./services.js";

class RequestHandler {
  // private field
  #body;
  constructor(body) {
    this.#body = body || {};
  }

  // static method
  static create(body) {
    try {
      return new RequestHandler(body);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // normal method
  async execute() {
    try {
      await requestValidation(this.#body);
      let response = null;

      if (this.#body.api_action === ApiAction.REGISTER) {
        response = register(this.#body);
      }

      if (this.#body.api_action === ApiAction.LOGIN) {
        response = login(this.#body.email, this.#body.password);
      }

      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default RequestHandler;
