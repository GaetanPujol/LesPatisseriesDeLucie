import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { recipeService } from '../../../_services/recipe.service.js';
import Button from "../../../components/Button/Button";
import "./recipe.scss";


const Recipe = () => {

    let navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [recipeIdToDelete, setRecipeIdToDelete] = useState(null);

    const flag = useRef(false);

    useEffect(() => {

        if (flag.current === false) {

            recipeService.getAllRecipes()
                .then(res => {


                    setRecipes(res.data.recipes);

                }).catch(err => console.log(err));

        }

        return () => flag.current = true;

    }, []);

    const delRecipe = (rid) => {

        setConfirmDelete(true);
        setRecipeIdToDelete(rid);

    };

    const handleDeleteConfirmed = () => {

        const adminToken = localStorage.getItem('token');

        if (!adminToken) {

            console.error("Admin token not found in local storage");
            return;

        }

        const config = {

            headers: {

                Authorization: adminToken

            }
        };

        recipeService.deleteRecipe(recipeIdToDelete, config)
            .then(res => {


                setRecipes(recipes.filter(recipe => recipe.recipe_id !== recipeIdToDelete));
                setConfirmDelete(false);
                setRecipeIdToDelete(null);

            }).catch(err => console.log(err));
    };

    const handleCancelDelete = () => {

        setConfirmDelete(false);
        setRecipeIdToDelete(null);

    };

    return (

        <section className="container recipeList">
        
            <h2>Liste des recettes</h2>
                
                    {recipes.map((recipe, index) => {
                    
                        return (
                        
                            <article className="recipeCard" key={index}>
                            
                                <p className="pRecipe">Titre : {recipe.title}</p>
                                <p className="pRecipe">{recipe.description}</p>
                                <p className="pRecipe">Catégorie : {recipe.category}</p>
                               
                                <Button type={"button"} text={"Modifier"} onClick={() => navigate(`/admin/recipe/edit/${recipe.recipe_id}`)} color={"#E0D5EC"} />
                               
                                <Button type={"button"} text={"Supprimer"} onClick={() => delRecipe(recipe.recipe_id)} color={"#E0D5EC"} /> 
                                   {confirmDelete && recipe.recipe_id === recipeIdToDelete && (
                           
                                 <section className="confirmDelete">
                            
                                    <p>Êtes-vous sûr de vouloir supprimer cette recette ?</p>
                                    <Button type={"button"} text={"Confirmer"} onClick={handleDeleteConfirmed} color={"#E0D5EC"} />
                                    <Button type={"button"} text={"Annuler"} onClick={handleCancelDelete} color={"#E0D5EC"} />
                                
                                 </section>
                       
                        )}
                                
                            </article>
                            
                        )
                    })}
                
        </section>

    )
}
export default Recipe;
