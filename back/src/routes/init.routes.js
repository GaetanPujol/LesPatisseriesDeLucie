import initUserRoutes from "./user.routes.js";
import initRecipeRoutes from "./recipe.routes.js";
import initCommentRoutes from "./comment.routes.js";
import initIngredientRoutes from "./ingredient.routes.js";

const initRoutes = (app) => {

  initRecipeRoutes(app);
  initCommentRoutes(app);
  initUserRoutes(app);
  initIngredientRoutes(app);

};

export default initRoutes;
