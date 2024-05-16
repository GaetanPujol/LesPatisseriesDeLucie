import React, { useState, useRef, useEffect } from 'react';
import { recipeService } from '../../../_services/recipe.service.js';
import RecipeCard from '../../../components/RecipeCards/RecipeCards.jsx';
import "./allRecipes.scss";


const AllRecipes = (props) => {

    const [recipes, setRecipes] = useState([]);
    const flag = useRef(false);

    useEffect(() => {

        if (flag.current === false) {

            recipeService.getAllRecipes()
                .then(res => setRecipes(res.data.recipes))
                .catch((error) => console.log(error));

        }

        return () => flag.current = true;

    }, []);



    return (

        <section className="container flex">
        
            {
            
                recipes.map((recipe, index) => (
                
                    <RecipeCard key={index} recipe={recipe} />
                
                ))
            }
        </section>
    );
};

export default AllRecipes;
