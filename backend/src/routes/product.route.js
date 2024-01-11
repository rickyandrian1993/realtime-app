import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import { autenticate } from "../controllers/error.controller.js";

const productRouter = Router();

productRouter.get("/products", autenticate, getAllProducts);
productRouter.get("/products/:id", autenticate, getProductById);
productRouter.post("/products", autenticate, createProduct);
productRouter.put("/products/:id", autenticate, updateProduct);
productRouter.delete("/products/:id", autenticate, deleteProduct);

export default productRouter;
