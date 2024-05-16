import express from "express";
import { CommentController } from "../controllers/comment.controller.js";
import jwt from "../middlewares/jwt.mdlwr.js";

const initCommentRoutes = (app) => {

  const commentRouter = express.Router();

  commentRouter.post("/", CommentController.create);

  commentRouter.put("/:commentId", jwt, CommentController.update);

  commentRouter.get("/:commentId", CommentController.readOne);
  commentRouter.get("/all", CommentController.readAll);

  commentRouter.get("/user/:userId", CommentController.readCommentsByUser);
  commentRouter.get("/recipe/:recipeId", CommentController.readCommentsByRecipe);

  commentRouter.delete("/:commentId", jwt, CommentController.deleteOne);

  app.use("/comments", commentRouter);

};

export default initCommentRoutes;
