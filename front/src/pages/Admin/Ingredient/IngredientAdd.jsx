import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ingredientService } from '../../../_services/ingredient.service';
import Button from '../../../components/Button/Button.jsx';
import Input from '../../../components/Input/Input.jsx';
import { useSelector } from "react-redux";

const IngredientAdd = () => {

    const [ingredient, setIngredient] = useState("");
    const [error, setError] = useState("");
    let navigate = useNavigate();

    const handleChange = (value) => {

        setIngredient(value);

    };

    const onSubmit = (e) => {

        e.preventDefault();

        if (!validateIngredient(ingredient)) {

            setError("L'ingrédient doit avoir au moins deux caractères non vides et commencer par une majuscule.");

            return;

        }


        if (ingredient.trim() !== ingredient) {

            setError("L'ingrédient ne doit pas commencer ou finir par des espaces.");

            return;

        }


        ingredientService.getAllIngredients()
            .then(res => {

                const foundIngredient = res.data.ingredient.find(item => item.ingredient.toLowerCase() === ingredient.toLowerCase());

                if (foundIngredient) {

                    setError("Cet ingrédient existe déjà.");

                }
                else {

                    ingredientService.addIngredient({ ingredient })
                        .then(res => navigate('../index'))
                        .catch(err => console.log(err));

                }
            })

            .catch(err => console.log(err));
    };

    const validateIngredient = (value) => {

        const regex = /^[A-Z][a-zA-Z\s]{1,}$/;
        return regex.test(value);

    };

    const { loading } = useSelector((store) => {

        return store.userState;

    });

    return (

        <section className="ingredientAdd">
        
            <h2>Ajouter un ingrédient</h2>
           
            <form onSubmit={onSubmit}>
               
                {error && <p style={{ color: "red" }}>{error}</p>}
              
                <Input label="Ingrédient" type="text" name="ingredient" value={ingredient} onChange={handleChange} />
                
                <Button type="submit" text={loading ? "Chargement..." : "Valider"} disabled={loading} color="#E0D5EC" />
            
            </form>
       
        </section>
    
    );
};

export default IngredientAdd;
