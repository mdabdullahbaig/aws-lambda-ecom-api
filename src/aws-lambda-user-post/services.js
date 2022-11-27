import { CustomError, StatusCodes } from "../utils/index.js";
import { getDBCollection } from "./database";

export const register = async (body) => {
  const user = {
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    mobile: body.mobile,
    password: body.password,
  };

  try {
    const mongoClient = await getDBCollection();
    const isUserExists = mongoClient.findOne({ email });

    if (isUserExists) {
      throw new CustomError(
        "User already exist in database",
        StatusCodes.BAD_REQUEST
      );
    }

    const insertedUser = mongoClient.insertOne(user);

    if (!insertedUser.acknowledged) {
      throw new CustomError(
        "Registration failed",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    return {
      message: "You are successfully registered",
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const login = async (email, password) => {};
