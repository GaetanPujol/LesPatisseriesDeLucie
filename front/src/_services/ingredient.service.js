import Axios from "./caller.service";

let getAllIngredients = () => {

    return Axios.get("/ingredients/all");

}

let getIngredient = (ingredientId) => {

    return Axios.get(`/ingredients/${ingredientId}`);

}

let deleteIngredient = (ingredientId, config) => {

    return Axios.delete(`/ingredients/${ingredientId}`, config);

}

let updateIngredient = (ingredient) => {

    return Axios.put(`/ingredients/${ingredient.ingredientId}`, ingredient);

}

let addIngredient = (ingredient) => {

    return Axios.post("/ingredients", ingredient);

}

export const ingredientService = { getAllIngredients, deleteIngredient, updateIngredient, addIngredient, getIngredient };