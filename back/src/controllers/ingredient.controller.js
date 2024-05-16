import { IngredientDB } from "../databases/ingredient.db.js";

/****************************** Create ******************************/

const create = async (req, res) => {

    const ingredient = req.body.ingredient
    const response = await IngredientDB.create(ingredient);

    const error = response.error;
    const result = response.result;

    const responseIngredient = await IngredientDB.readOne(response.ingredientId)
    const resultNewIngredient = responseIngredient.result;

    if (error) return res.status(500).json({ message: "Error creating", error });

    return res.status(201).json({ message: "Successful creation", resultNewIngredient });

};

/****************************** Read One ******************************/

const readOne = async (req, res) => {

    const ingredientId = req.params.ingredientId;

    const response = await IngredientDB.readOne(ingredientId);
    const result = response.result;

    if (!result || result.length === 0) return res.status(404).json({ message: "Ingredient not found" });

    const ingredient = {
        ingredientId,
        ingredient: result[0].ingredient
    };

    return res.status(200).json({ message: "Request OK", ingredient });

};

/****************************** Read All ******************************/

const readAll = async (req, res) => {

    const ingredientResponse = await IngredientDB.readAll();
    const ingredient = ingredientResponse.result;

    return res.status(200).json({ message: "Request OK", ingredient });

};

/****************************** Update ******************************/

const update = async (req, res) => {

    const ingredientId = req.params.ingredientId;
    const ingredient = req.body.ingredient;

    const response = await IngredientDB.update(ingredientId, ingredient);

    if (response.error) return res.status(500).json({ message: response.error });

    return res.status(200).json({ message: `Ingredient number ${ingredientId} ${ingredient} has been edited` });

};

/****************************** Delete One ******************************/

const deleteOne = async (req, res) => {

    const ingredientId = req.params.ingredientId;

    const response = await IngredientDB.deleteOne(ingredientId);

    let error = response.error;

    if (error) return res.status(500).json({ message: error });

    else return res.status(200).json({ message: "ingredient deleted" });

};

export const IngredientController = { readOne, readAll, create, deleteOne, update, };



