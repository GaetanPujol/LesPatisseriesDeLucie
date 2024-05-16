import { useState } from "react";
import { recipeService } from "../../../_services/recipe.service";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./recipe.scss";

const RecipeAdd = () => {
    
    const [recipe, setRecipe] = useState({
        
        title: "",
        description: "",
        steps: "",
        category: "",
        picture: ""
        
    });

    const [errors, setErrors] = useState({
        
        title: "",
        description: "",
        steps: "",
        category: "",
        picture: ""
        
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (value, name) => {
        
        setRecipe(prevRecipe => ({
            
            ...prevRecipe,
            [name]: value
            
        }));
        
    };

const onSubmit = (e) => {
    
    e.preventDefault();
    setLoading(true);


    setErrors({
        
        title: "",
        description: "",
        steps: "",
        category: "",
        picture: ""
        
    });

    let hasErrors = false;

  
    if (recipe.title.trim().length < 3) {
        
        setErrors(prevErrors => ({
            ...prevErrors,
            title: "Le titre doit contenir au moins 3 caractères non vides."
            
        }));
        
        hasErrors = true;
        
    }

   
    if (recipe.description.trim().length < 20) {
        
        setErrors(prevErrors => ({
            
            ...prevErrors,
            description: "La description doit contenir au moins 20 caractères."
            
        }));
        
        hasErrors = true;
        
    }

   
    if (recipe.steps.trim().length < 50) {
        
        setErrors(prevErrors => ({
            
            ...prevErrors,
            steps: "Les étapes doivent contenir au moins 50 caractères."
            
        }));
        
        hasErrors = true;
        
    }

   
    if (recipe.category.trim().length === 0) {
        
        setErrors(prevErrors => ({
            
            ...prevErrors,
            category: "Veuillez sélectionner une catégorie."
        
        }));
        
        hasErrors = true;
    
        
    }

  
    if (hasErrors) {
  
        setLoading(false);
        return;
  
    }

    
    const pictureName = recipe.picture.split("\\").pop();
    const newRecipe = {
        
        ...recipe,
        picture: pictureName
    
    };

    recipeService.createRecipe(newRecipe)
        .then(() => {
    
            navigate("../index");
    
        })
        .catch((err) => {
    
            console.error(err);
            setErrors(prevErrors => ({
    
                ...prevErrors,
                picture: "Une erreur s'est produite lors de l'ajout de la recette."
    
            }));
        })
        .finally(() => {
    
            setLoading(false);
    
        });
};

    const allowedRoles = ['Sucré', 'Salé'];

    return (
        
        <secition className="recipeAdd">
        
            <h2>Ajouter une nouvelle recette</h2>
            
            <form onSubmit={onSubmit} encType="multipart/form-data">
                
                <Input id="title" label="Titre" type="text" name="title" value={recipe.title} onChange={(value) => handleChange(value, "title")} />
                
                {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}
                
                <Input id="description" label="Description" type="text" name="description" value={recipe.description} onChange={(value) => handleChange(value, "description")} />
                
                {errors.description && <span style={{ color: "red" }}>{errors.description}</span>}
                
                <Input id="steps" label="Étapes" type="text" name="steps" value={recipe.steps} onChange={(value) => handleChange(value, "steps")} />
                
                {errors.steps && <span style={{ color: "red" }}>{errors.steps}</span>}
    
                <section className="form-group">
    
                    <label htmlFor="category" className="form-label">Catégorie :</label>
    
                    <select
    
                        id="category"
                        name="category"
                        value={recipe.category}
                        onChange={(value) => handleChange(value.currentTarget.value, "category")}
                        className="form-select"
    
                    >
    
                        {allowedRoles.map((category, index) => (
    
                            <option key={index} value={category} className="form-option">{category}</option>
    
                        ))}
    
                    </select>
    
                </section>
    
                <Input id="picture" label="Photo" type="file" name="picture" accept="image/*" onChange={(value) => handleChange(value, "picture")} />
    
                {errors.picture && <span style={{ color: "red" }}>{errors.picture}</span>}
    
                    <Button type="submit" text={loading ? "Chargement..." : "Valider"} disabled={loading} color="#E0D5EC" />
                
             
             </form>
        
        </secition>
    
    );
};

export default RecipeAdd;
