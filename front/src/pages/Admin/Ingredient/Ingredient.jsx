import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ingredientService } from '../../../_services/ingredient.service';
import Button from "../../../components/Button/Button";
import "./ingredient.scss";

const Ingredient = () => {

    let navigate = useNavigate();
    const [ingredients, setIngredients] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [ingredientIdToDelete, setIngredientIdToDelete] = useState(null);
    const flag = useRef(false);

    useEffect(() => {

        if (flag.current === false) {

            ingredientService.getAllIngredients()
                .then(res => {

                    setIngredients(res.data.ingredient);

                })
                .catch(err => console.log(err));

        }

        return () => flag.current = true;


    }, []);

    const delIngredient = (iid) => {

        setConfirmDelete(true);
        setIngredientIdToDelete(iid);

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

        ingredientService.deleteIngredient(ingredientIdToDelete, config)
            .then(res => {

                console.log(res);
                setIngredients(ingredients.filter(ingredient => ingredient.ingredient_id !== ingredientIdToDelete));
                setConfirmDelete(false);
                setIngredientIdToDelete(null);

            })
            .catch(err => console.log(err));

    };

    const handleCancelDelete = () => {

        setConfirmDelete(false);
        setIngredientIdToDelete(null);

    };

    return (

        <section className="ingredientList container">
         
            <h2>Ingredients</h2>
            
            {ingredients.map((ingredient, index) => {
            
                return (
            
                    <article className="ingredientCard" key={index}>
                    
                        <p className="pIngredient">{ingredient.ingredient}</p>
    
                        <Button id="btnsIngredient" type={"button"} text={"Modifier"} onClick={() => navigate(`/admin/ingredient/edit/${ingredient.ingredient_id}`)} color={"#E0D5EC"} />
    
                        <Button id="btnsIngredient" type={"button"} text={"Supprimer"} onClick={() => delIngredient(ingredient.ingredient_id)} color={"#E0D5EC"} />
    
                        {confirmDelete && ingredient.ingredient_id === ingredientIdToDelete && (
    
                            <section className="confirmDelete">
                             
                                <p>Êtes-vous sûr de vouloir supprimer cet ingrédient ?</p>
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

export default Ingredient;
