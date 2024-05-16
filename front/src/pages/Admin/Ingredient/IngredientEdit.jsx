import { useParams, useNavigate } from "react-router-dom";
import { ingredientService } from "../../../_services/ingredient.service";
import { useState, useEffect } from "react";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useSelector } from "react-redux";
import "./ingredient.scss";

const IngredientEdit = () => {

    const [ingredient, setIngredient] = useState({ ingredient: "" });
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [existingIngredient, setExistingIngredient] = useState(null);

    let navigate = useNavigate();
    let { iid } = useParams();

    const handleChange = (value, inputName) => {

        setIngredient({

            ...ingredient,
            [inputName]: value

        });
    };

    const onSubmit = (e) => {

        e.preventDefault();

        setSubmitted(true);


        if (!validateIngredient(ingredient.ingredient)) {

            setError("L'ingrédient doit avoir au moins deux caractères non vides et commencer par une majuscule.");
            return;

        }


        ingredientService.getAllIngredients()
            .then(res => {

                const foundIngredient = res.data.ingredient.find(item => item.ingredient.toLowerCase() === ingredient.ingredient.toLowerCase());
                setExistingIngredient(foundIngredient);

                if (foundIngredient && foundIngredient.ingredient_id !== iid) {

                    setError("Ce nom d'ingrédient est déjà utilisé.");
                    return;

                }


                ingredientService.updateIngredient(ingredient)
                    .then(res => {

                        navigate("../index");

                    })
                    .catch(err => console.log(err));
            })
            .catch(err => {

                console.error(err);

            });
    };

    const validateIngredient = (value) => {

        const regex = /^[A-Z][a-zA-Z\s]{1,}$/;
        return regex.test(value);

    };

    const { loading } = useSelector((store) => {

        return store.userState;

    });

    useEffect(() => {

        ingredientService.getIngredient(iid)
            .then(res => {

                setIngredient(res.data.ingredient);

            })
            .catch(err => console.log(err));
    }, [iid]);

    return (

        <section className="ingredientEdit">
        
            <h2>Modification de l'ingrédient</h2>
        
            <form onSubmit={onSubmit}>
        
                {submitted && error && <p style={{ color: "red" }}>{error}</p>}
        
                <Input label="Ingredient" type="text" name="ingredient" value={ingredient.ingredient} onChange={(value) => handleChange(value, "ingredient")} />
               
                    <Button type={"submit"} text={loading ? "Chargement..." : "Valider"} disabled={loading} color={"#E0D5EC"} />
                    
            </form>
        
        </section>
   
    );
}

export default IngredientEdit;
