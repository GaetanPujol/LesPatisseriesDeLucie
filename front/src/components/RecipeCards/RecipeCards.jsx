import { Link } from "react-router-dom";
import "./recipeCards.scss";
const RecipeCard = ({ recipe }) => {

    return (

        <Link to={`/recipes/${recipe.recipe_id}`} className="cardLink">
        
            <article className='recipeArticle'>
        
                <h3 className='h3Article'>{recipe.title}</h3>
               <img className="cardsImg" src={`./src/uploads/${recipe.picture}`} alt={`Photo de ${recipe.title}` } />
               
            </article>
        
        </Link>

    );
};

export default RecipeCard;
