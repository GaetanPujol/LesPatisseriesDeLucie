import express from "express";
import { UserController } from "../controllers/user.controller.js";
import jwt from "../middlewares/jwt.mdlwr.js";
import jwtBissMdlwr from "../middlewares/jwtBiss.mdlwr.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";
import checkUserOwnership from "../middlewares/check-user.mdlwr.js";

const initUserRoutes = (app) => {

  const router = express.Router();

  router.get("/all", UserController.readAll);
  router.get("/:userId", UserController.readOne);
  // router.get("/byId/:userId", UserController.)


  router.post("/", UserController.create);
  router.post("/sign-in", UserController.signIn);

  router.put("/edit/:userId", jwtBissMdlwr, checkUserOwnership, UserController.update);
  router.put("/admin/user/edit/:userId", jwt, checkAdmin, UserController.updateAdmin);

  router.delete("/:userId", jwt, checkAdmin, UserController.deleteUser);

  app.use("/users", router);

};

export default initUserRoutes;
