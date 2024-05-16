import { useParams, useNavigate } from "react-router-dom";
import { recipeService } from "../../../_services/recipe.service";
import { useEffect, useRef, useState } from "react";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useSelector } from "react-redux";

const RecipeEdit = () => {

    const [recipe, setRecipe] = useState([]);
    const [errorMessage, setErrorMessage] = useState(""); 
    const flag = useRef(false);
    let navigate = useNavigate();
    let { rid } = useParams();

    const handleChange = (value, inputName) => {
        
        setRecipe({
            
            ...recipe,
            [inputName]: value
            
        });
    };

    const onSubmit = (e) => {
        
        e.preventDefault();

        if (!recipe.title || !recipe.description || !recipe.steps || !recipe.category) {
       
            setErrorMessage("Veuillez remplir tous les champs.");
            return;
            
        }
        
        setErrorMessage("");
        recipeService.updateRecipe(recipe)
            .then(res => {
                
                navigate("../../index");
                
            }).catch(err => console.log(err));
    };

    const { loading } = useSelector((store) => {
        
        return store.userState;
    
    });

    useEffect(() => {
    
        if (flag.current === false) {
    
            recipeService.getRecipe(rid)
                .then(res => {
    
                    setRecipe(res.data.recipe);
    
                }).catch(err => console.log(err));
        }
    
        return () => flag.current = true;
    
    }, []);

    const allowedRoles = ['Sucré', 'Salé'];

    return (
    
        <section className="recipeEdit">
    
            <h2>Modification de la recette</h2>
    
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Affichage du message d'erreur */}
    
            <form onSubmit={onSubmit}>
            
                <Input id="title" label="Titre" type="text" name="title" value={recipe.title} onChange={(value) => handleChange(value, "title")} />
            
                <label htmlFor="description">Description :</label>
            
                <textarea id="description" name="description" value={recipe.description} onChange={(e) => handleChange(e.target.value, "description")} />
            
                <label htmlFor="steps">Étapes :</label>
            
                <textarea id="steps" name="steps" value={recipe.steps} onChange={(e) => handleChange(e.target.value, "steps")} />
            
                <section className="form-group">
            
                    <label htmlFor="category" className="form-label">Catégorie :</label>
            
                    <select
            
                        id="category"
                        name="category"
                        value={recipe.category}
                        onChange={(e) => handleChange(e.target.value, 'category')}
                        className="form-select"
            
                    >
            
                        {allowedRoles.map((category, index) => (
            
                            <option key={index} value={category} className="form-option">{category}</option>
            
                        ))}
            
                    </select>
            
                </section>
            
                    <Button type={"submit"} text={loading ? "Chargement..." : "Valider"} disabled={loading} color={"#E0D5EC"} />
          
            </form>
        
        </section>
    
    )
}

export default RecipeEdit;
