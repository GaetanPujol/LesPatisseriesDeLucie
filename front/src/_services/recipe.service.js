import Axios from './caller.service'


let getAllRecipes = () => {

    return Axios.get('/recipes/all')

}

let getFiveRecipes = () => {

    return Axios.get('/recipes')

}

let getRecipe = (rid) => {

    return Axios.get(`/recipes/${rid}`)

}

let createRecipe = (recipe) => {

    return Axios.post('/recipes', recipe)

}


let updateRecipe = (recipe) => {

    return Axios.put(`/recipes/${recipe.recipeId}`, recipe)

}

let deleteRecipe = (rid) => {

    return Axios.delete(`/recipes/${rid}`)

}


export const recipeService = { getAllRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe, getFiveRecipes }
