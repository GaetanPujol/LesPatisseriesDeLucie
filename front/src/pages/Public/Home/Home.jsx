import React, { useState, useRef, useEffect } from 'react';
import { recipeService } from '../../../_services/recipe.service.js';
import RecipeCard from '../../../components/RecipeCards/RecipeCards.jsx';
import "./home.scss";

const Home = (props) => {

    const [recipes, setRecipes] = useState([]);
    const flag = useRef(false);

    useEffect(() => {

        if (flag.current === false) {

            recipeService.getFiveRecipes()
                .then(res => setRecipes(res.data.recipes))
                .catch((error) => console.log(error));

        }

        return () => flag.current = true;

    }, []);



    return (

        <section className="container flex">
        
                <h2 className="h2Yt">Nos vidéos Youtube !</h2>
                <iframe 
                    width="80%" 
                    height="315" 
                    src="https://www.youtube.com/embed/UGsvfsrP2fo?si=NQ-HNLFgq-kgE5Gc" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allowFullScreen 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    >
                </iframe>
            
            {
            
                recipes.map((recipe, index) => (
            
                    <RecipeCard key={index} recipe={recipe} />
            
                ))
            }
    
        </section>

    );
};

export default Home;
