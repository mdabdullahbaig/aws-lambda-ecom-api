import Joi from "joi";
import { ApiAction } from "./constants.js";
import { CustomError, StatusCodes } from "../utils/index.js";

const requestValidation = async (body) => {
  const schemaQuery = {
    api_action: Joi.number().valid(1, 2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  };

  if (body?.api_action === ApiAction.REGISTER) {
    schemaQuery.first_name = Joi.string().min(2).required();
    schemaQuery.last_name = Joi.string().min(2).required();
    schemaQuery.gender = Joi.string()
      .valid("Male", "Female", "Other")
      .required();
    schemaQuery.mobile = Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({
        "string.pattern.base": `Phone number must have 10 digits.`,
      })
      .required();
  }

  const schema = Joi.object(schemaQuery);

  try {
    await schema.validateAsync(body);
  } catch (err) {
    console.log("Async Schema Error", err);
    throw new CustomError(err.message, StatusCodes.BAD_REQUEST);
  }
};

export default requestValidation;
