import express from "express";
import jwt from "../middlewares/jwt.mdlwr.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";
import { IngredientController } from "../controllers/ingredient.controller.js";

const initIngredientRoutes = (app) => {

    const ingredientRouter = express.Router();

    ingredientRouter.get("/all", IngredientController.readAll);
    ingredientRouter.get("/:ingredientId", IngredientController.readOne);

    ingredientRouter.post("/", jwt, checkAdmin, IngredientController.create);

    ingredientRouter.put("/:ingredientId", jwt, checkAdmin, IngredientController.update);


    ingredientRouter.delete("/:ingredientId", jwt, checkAdmin, IngredientController.deleteOne);

    app.use("/ingredients", ingredientRouter);

};

export default initIngredientRoutes;
