import { Routes, Route } from "react-router-dom";
import Error from "../../_utils/error";
import { AdminLayout } from "./router";
import { User, UserEdit } from "./User/userRouter";
import { Recipe, RecipeEdit, RecipeAdd } from "./Recipe/recipeRouter";
import { Ingredient, IngredientAdd, IngredientEdit } from "./Ingredient/ingredientRouter";

const AdminRouter = () => {

    return (

        <Routes>
        
            <Route element={<AdminLayout />}>
            
                <Route path="user">
                
                    <Route path="index" element={<User />} />
                    <Route path="edit/:uid" element={<UserEdit />} />
                    
                </Route>

                <Route path="recipe">
                
                    <Route path="index" element={<Recipe />} />
                    <Route path="add" element={<RecipeAdd />} />
                    <Route path="edit/:rid" element={<RecipeEdit />} />
                    
                </Route>

                <Route path="ingredient">
                
                    <Route path="index" element={<Ingredient />} />
                    <Route path="add" element={<IngredientAdd />} />
                    <Route path="edit/:iid" element={<IngredientEdit />} />
                    
                </Route>

                <Route path="*" element={<Error />} />
                
            </Route>
            
        </Routes>

    )
}

export default AdminRouter;
