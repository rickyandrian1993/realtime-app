import prisma from "../utils/client.js";
import { inputProductValidation } from "../validation/product.validation.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const data = await prisma.product.findMany({
      orderBy: [{ name: "asc" }],
    });

    if (!data)
      return res.status(404).json({
        error: "Data not found",
        message: "Failed",
        data: null,
      });

    return res.status(200).json({
      error: null,
      message: "Success",
      data,
    });
  } catch (err) {
    next(new Error("Error in src/controller/product.controller.js:getAllProduct - " + err.message));
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!data)
      return res.status(404).json({
        error: "Data not found",
        message: "Failed",
        data: null,
      });

    return res.status(200).json({
      error: null,
      message: "Success",
      data,
    });
  } catch (err) {
    next(new Error("Error in src/controller/product.controller.js:getProductById - " + err.message));
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { error, value } = inputProductValidation(req.body);

    if (error)
      return res.status(400).json({
        error: error.details[0].message,
        message: "Failed",
        data: null,
      });

    const data = await prisma.product.create({
      data: { ...value },
    });

    return res.status(201).json({
      error: null,
      message: "Success",
      data,
    });
  } catch (err) {
    next(new Error("Error in src/controller/product.controller.js:createProduct - " + err.message));
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = inputProductValidation(req.body);

    if (error)
      return res.status(400).json({
        error: error.details[0].message,
        message: "Failed",
        data: null,
      });

    const data = await prisma.product.update({
      where: { id: Number(id) },
      data: { ...value },
    });

    return res.status(200).json({
      error: null,
      message: "Success",
      data,
    });
  } catch (err) {
    next(new Error("Error in src/controller/product.controller.js:updateProduct - " + err.message));
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await prisma.product.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({
      error: null,
      message: "Success",
      data,
    });
  } catch (err) {
    next(new Error("Error in src/controller/product.controller.js:deleteProduct - " + err.message));
  }
};
