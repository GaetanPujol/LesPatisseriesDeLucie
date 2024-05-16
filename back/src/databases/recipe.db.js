import query from "./init.db.js";
import { v4 as uuidv4 } from 'uuid';

/****************************** Create ******************************/

const create = async(title, description, steps, picture, category, userId, ingredients) => {

  const recipeId = uuidv4();

  const recipeSql = `
    INSERT INTO recipes (recipe_id, title, description, steps, picture, category, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const recipeIngredientSql = `
    INSERT INTO recipe_ingredient (recipe_id, ingredient_id, unit, quantity)
    VALUES (?, ?, ?, ?)
  `;

  let error = null;

  try {

    await query(recipeSql, [recipeId, title, description, steps, picture, category, userId]);

    if (ingredients && ingredients.length > 0) {

      for (const ingredient of ingredients) {

        const { ingredient_id, unit, quantity } = ingredient;
        await query(recipeIngredientSql, [recipeId, ingredient_id, unit, quantity]);

      }

    }
  }
  catch (e) {

    error = e.message;

  }
  finally {

    return { error, recipeId };

  }
};

/****************************** Read ******************************/

const read = async() => {

  const sql = `
        SELECT recipe_id, title, CONCAT(LEFT(description, 100), "...") AS description,steps, date,picture,category
        FROM recipes
        ORDER BY date DESC
        LIMIT 5
    `;

  let error = null;
  let result = null;

  try {

    result = await query(sql);

  }
  catch (e) {

    error = e.message;

  }
  finally {

    return { error, result };

  }
};

/****************************** Read One ******************************/

const readOne = async(recipeId) => {

  const sql = `
     SELECT
     recipes.recipe_id,
       title,
       description,
       steps,
       picture,
       category,
       recipe_ingredient.ingredient_id,
       unit,
       quantity,
       ingredient.ingredient AS ingredient,
       comments.comment_id,
       comments.content,
       comments.date,
       comments.user_id,
       users.pseudo as user_pseudo
     FROM
     recipes
     LEFT JOIN
     comments ON recipes.recipe_id = comments.recipe_id
     LEFT JOIN
       (
         SELECT recipe_id,
         recipe_ingredient.ingredient_id,
         unit,
         quantity FROM recipe_ingredient JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.ingredient_id
       ) AS recipe_ingredient ON recipes.recipe_id = recipe_ingredient.recipe_id
     LEFT JOIN
     ingredient ON recipe_ingredient.ingredient_id = ingredient.ingredient_id
     LEFT JOIN
     users ON comments.user_id = users.user_id
     WHERE
     recipes.recipe_id = ? ;
    `

  let error = null;
  let result = null;

  try {

    result = await query(sql, [recipeId]);

  }
  catch (e) {

    error = e.message;

  }
  finally {

    return { error, result };

  }
};

/****************************** Read All ******************************/

const readAll = async() => {

  const sql = `
    SELECT 
      recipes.recipe_id, recipes.title, CONCAT(LEFT(recipes.description, 100), "...") AS description, 
      recipes.steps, recipes.picture, recipes.category
    FROM recipes
    ORDER BY title
  `;

  let error = null;
  let result = null;

  try {

    result = await query(sql);

  }
  catch (e) {

    error = e.message;

  }
  finally {

    return { error, result };

  }
};

/****************************** Update ******************************/

const update = async(title, description, steps, picture, category, recipeId, userId, ingredients) => {

  const updateRecipeSql = `
    UPDATE recipes
    SET title = ?, description = ?, steps = ?, picture = ?, category = ?, user_id = ?
    WHERE recipe_id = ?
  `;
  const deleteIngredientsSql = `
    DELETE FROM recipe_ingredient
    WHERE recipe_id = ?
  `;
  const insertIngredientsSql = `
    INSERT INTO recipe_ingredient (recipe_id, ingredient_id, unit, quantity)
    VALUES (?, ?, ?, ?)
  `;

  await checkUserAndRecipe(recipeId, userId);

  let error = null;
  let result = null;

  try {

    await query(updateRecipeSql, [title, description, steps, picture, category, userId, recipeId]);
    await query(deleteIngredientsSql, [recipeId]);

    if (ingredients && ingredients.length > 0) {

      for (const ingredient of ingredients) {

        const { ingredient_id, unit, quantity } = ingredient;
        await query(insertIngredientsSql, [recipeId, ingredient_id, unit, quantity]);

      }

    }

    result = await readOne(recipeId);

    if (result.affectedRows !== 1) throw new Error("Recipe didn't update ");

  }
  catch (e) {

    error = e.message;

  }
  finally {

    return { error, result };

  }
};
/****************************** Delete One ******************************/

const deleteOne = async(recipeId, userId) => {

  const sql = `
      DELETE FROM recipes
      WHERE recipe_id = ?
  `;
  const ingredientSql = `
      DELETE FROM recipe_ingredient
      WHERE recipe_id = ?
  `;
  const commentSql = `
      DELETE FROM comments
      WHERE recipe_id = ?
  `;

  let error = null;
  let result = null;

  try {

    await checkUserAndRecipe(recipeId, userId);
    await query(commentSql, [recipeId]);
    await query(ingredientSql, [recipeId]);

    result = await query(sql, [recipeId]);

    if (result.affectedRows !== 1) throw new Error("Recipe didn't delete ");

  }
  catch (e) {

    error = e.message;

  }
  finally {

    return { result, error };

  }
};

/****************************** Check User And Recipe ******************************/

const checkUserAndRecipe = async(recipeId, userId) => {

  const recipeSql = `
     SELECT recipe_id, user_id FROM recipes 
     WHERE recipe_id = ?`;

  const recipeResult = await query(recipeSql, [recipeId]);
  const recipeErr = recipeResult.error;

  if (recipeErr) throw new Error(recipeErr);

  const recipe = recipeResult[0];

  if (recipe.user_id !== userId) throw new Error(`User with id ${userId} is not the creator of recipe with id ${recipeId}`);

};








export const RecipeDB = { update, read, readOne, readAll, create, deleteOne };
