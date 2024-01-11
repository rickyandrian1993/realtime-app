import prisma from "../utils/client.js";
import { generateAccessToken, generateRefreshToken, parseJWT, verifyRefreshToken } from "../utils/jwt.js";
import { inputUserValidation } from "../validation/user.validation.js";

export const createUser = async (req, res, next) => {
  try {
    const { error, value } = inputUserValidation(req.body);

    if (error)
      return res.status(400).json({
        error: error.details[0].message,
        message: "Failed",
        data: null,
      });

    const user = await prisma.user.create({
      data: { ...value },
    });

    return res.status(201).json({
      error: null,
      message: "Success",
      data: user,
    });
  } catch (err) {
    next(new Error("Error in src/controller/user.controller.js:createUser - " + err.message));
  }
};

export const getAccessToken = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { uuid: id },
    });

    if (!user)
      return res.status(404).json({
        error: "User not found",
        message: "Failed",
        data: null,
      });

    // Generate access token
    user.uuid = "xxxxxxxxxxxx";
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.status(200).json({
      error: null,
      message: "Success",
      data: user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(new Error("Error in src/controller/user.controller.js:getAccessToken - " + err.message));
  }
};

export const getRefreshToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
      return res.status(401).json({
        error: "Invalid token",
        message: "No token provided",
        data: null,
      });

    const verify = verifyRefreshToken(token);

    if (!verify)
      return res.status(401).json({
        error: "Invalid token",
        message: "Provided token is not valid",
        data: null,
      });

    let data = parseJWT(token);
    const user = await prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!user)
      return res.status(400).json({
        error: "User not found",
        message: "Failed",
        data: null,
      });

    user.uuid = "xxxxxxxxxxxx";
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.status(200).json({
      error: null,
      message: "Success",
      data: user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(new Error("Error in src/controller/user.controller.js:getRefreshToken - " + err.message));
  }
};
