import Layout from "../Layout/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import Error from "../../../_utils/error";
import Recipe from "../Recipe/Recipe";
import AllRecipes from "../Recipe/AllRecipes";

const PublicRouter = () => {

    return (

        <Routes>
        
            <Route element={<Layout />}>
            
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/recipes" element={<AllRecipes />} />
                <Route path="/users/sign-in" element={<SignInForm />} />
                <Route path="/recipes/:rid" element={<Recipe />} />
                <Route path="/users/sign-up" element={<SignUpForm />} />
                <Route path="*" element={<Error />} />
                
            </Route>
            
        </Routes>

    );
};

export default PublicRouter;
