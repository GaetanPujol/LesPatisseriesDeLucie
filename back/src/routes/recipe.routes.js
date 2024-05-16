import express from "express";
import jwt from "../middlewares/jwt.mdlwr.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";
import { RecipeController } from "../controllers/recipe.controller.js";

const initRecipeRoutes = (app) => {

  const recipeRouter = express.Router();

  recipeRouter.get("/all", RecipeController.readAll);
  recipeRouter.get("/:recipeId", RecipeController.readOne);
  recipeRouter.get("/", RecipeController.read);

  recipeRouter.post("/", jwt, checkAdmin, RecipeController.create);

  recipeRouter.put("/:recipeId", jwt, checkAdmin, RecipeController.update);

  recipeRouter.delete("/:recipeId", jwt, checkAdmin, RecipeController.deleteOne);

  app.use("/recipes", recipeRouter);

};

export default initRecipeRoutes;
