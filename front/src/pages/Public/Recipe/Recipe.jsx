import { useEffect, useState } from "react";
import { recipeService } from "../../../_services/recipe.service";
import { commentService } from "../../../_services/comment.service";
import { useParams } from "react-router-dom";
import "./recipe.scss";

const Recipe = () => {

    const [recipe, setRecipe] = useState([]);
    const [completedSteps, setCompletedSteps] = useState([]);
    let { rid } = useParams();

    useEffect(() => {

        recipeService.getRecipe(rid)
            .then(res => {

                setRecipe(res.data.recipe);
                setCompletedSteps(Array(res.data.recipe.steps.split("/").length).fill(false));

            })
            .catch(err => console.log(err));

    }, []);

    const handleStepToggle = (index) => {

        const newCompletedSteps = [...completedSteps];
        newCompletedSteps[index] = !newCompletedSteps[index];
        setCompletedSteps(newCompletedSteps);

    };

    const formatDate = (dateString) => {

        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('fr-FR', options);

    };


    return (

        <section className="container">
  
            <article className="recipesArticle">
  
                <h2 className="recipesTitle">{recipe.title}</h2>
  
                <img className="recipePicture" src={`../src/uploads/${recipe.picture}`} alt={`Photo de ${recipe.title}`} />
  
                <p className="recipesDescription">{recipe.description}</p>
  
                <h3 className="recipesH3">Ingrédients :</h3>
  
                <ul>
  
                    {recipe.ingredients && recipe.ingredients.map((ingredient) => (
  
                        <li key={ingredient.id}>
                         - {ingredient.ingredient} : {ingredient.quantity} {ingredient.unit} 
                        </li>
  
                    ))}
  
                </ul>
  
                <h3 className="recipesH3">Étapes :</h3>
  
                {recipe.steps && (
  
                    <section>
                    
                        {recipe.steps.split("/").map((step, index) => (
                    
                            <div key={index} className={completedSteps[index] ? 'completed-step' : ''}>
                    
                                <input
                                    type="checkbox"
                                    checked={completedSteps[index]}
                                    onChange={() => handleStepToggle(index)}
                                />
                    
                                <label>{step.trim()}</label>
                    
                            </div>
                    
                        ))}
                    
                    </section>
                
                )}
                
                 <h3 className="recipesH3">Commentaires :</h3>
                   
    {
    
                recipe.comments && recipe.comments.map((comment) => (
            
                <section key={comment.id} className="comment">
        
                   <p className="pseudo"><strong>{comment.pseudo}</strong></p>
                   <p className="commentContent">{comment.content}</p>
                   <p className="commentDate">Le {formatDate(comment.date)}</p>
    
                </section>
        
        ))
    }
        
            </article>
        
        </section>

    );
};

export default Recipe;