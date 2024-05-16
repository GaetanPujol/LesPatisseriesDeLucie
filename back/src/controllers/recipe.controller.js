import { RecipeDB } from "../databases/recipe.db.js";
import { IngredientDB } from "../databases/ingredient.db.js";
import express from 'express';
import multer from 'multer';
import path from 'path';

const upload = multer({
  // Définissez le chemin relatif du dossier de destination des téléchargements
  dest: path.join(process.cwd(), '../../../front/src/uploads/')
});

/****************************** Create ******************************/

const create = async(req, res) => {
  try {
    const { title, description, steps, category, userId, ingredients } = req.body;

    // Vérifiez si une image est téléchargée dans la requête
    if (!req.file) {
      return res.status(400).json({ message: 'Aucune image téléversée !' });
    }

    // Obtenez le chemin de l'image téléchargée
    const picture = req.file.path;

    // Créez la recette en utilisant les données fournies et le chemin de l'image
    const response = await RecipeDB.create(title, description, steps, picture, category, userId, ingredients);
    const { recipeId } = response;

    // Récupérez la recette créée avec son identifiant
    const createResponse = await RecipeDB.readOne(recipeId);
    const { result, resultIngredient } = createResponse;

    // Envoyez une réponse réussie avec la recette créée
    return res.status(201).json({ message: 'Recipe created successfully', recipe: result, resultIngredient });
  }
  catch (error) {
    // Gérez les erreurs
    console.error('Error creating recipe:', error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la création de la recette.' });
  }
};

/****************************** Read ******************************/

const read = async(req, res) => {

  const response = await RecipeDB.read();
  const result = response.result;

  return res.status(200).json({ message: "Request OK", recipes: result });

};

/****************************** ReadOne ******************************/

const readOne = async(req, res) => {
  const recipeId = req.params.recipeId;
  const response = await RecipeDB.readOne(recipeId);
  const result = response.result;

  if (!result || result.length === 0) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  const recipe = {
    recipeId,
    title: result[0].title,
    description: result[0].description,
    steps: result[0].steps,
    picture: result[0].picture,
    category: result[0].category,
    ingredients: result.map((ingredient) => {
      return {
        id: ingredient.ingredient_id,
        ingredient: ingredient.ingredient,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      };
    }),
    comments: result
      .filter((r) => r.comment_id)
      .map((comment) => {
        return {
          id: comment.comment_id,
          pseudo: comment.user_pseudo, // Utilisez user_pseudo pour récupérer le pseudo
          date: comment.date,
          content: comment.content,
        };
      }),
  };

  const uniqueComments = recipe.comments.filter(
    (comment, index, self) =>
    index === self.findIndex((c) => c.id === comment.id)
  );

  recipe.comments = uniqueComments;

  return res.status(200).json({ message: "Request OK", recipe });
};

/****************************** Read All ******************************/

const readAll = async(req, res) => {

  const recipeResponse = await RecipeDB.readAll();


  const recipes = recipeResponse.result;


  return res.status(200).json({ message: "Request OK", recipes });

};

/****************************** Update ******************************/

const update = async(req, res) => {

  const recipeId = req.params.recipeId;
  const { title, description, steps, picture, category, userId, ingredients } = req.body;

  const response = await RecipeDB.update(title, description, steps, picture, category, recipeId, userId, ingredients);

  if (response.error) return res.status(500).json({ message: response.error });

  return res.status(200).json({ message: `Recipe ${title} has been edited` });

};

/****************************** Delete One ******************************/

const deleteOne = async(req, res) => {

  const recipeId = req.params.recipeId;
  const userId = req.body.userId;
  const response = await RecipeDB.deleteOne(recipeId, userId);

  let error = response.error;

  if (error) return res.status(500).json({ message: error });

  else return res.status(200).json({ message: "recipe deleted" });

};

export const RecipeController = { read, readOne, readAll, create, deleteOne, update, };
