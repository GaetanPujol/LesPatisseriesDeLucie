import query from "./init.db.js";
import { v4 as uuidv4 } from 'uuid';

/****************************** Create ******************************/

const create = async (ingredient) => {

  const ingredientId = uuidv4();

  const ingredientSql = `
    INSERT INTO ingredient (ingredient_id, ingredient)
    VALUES (?, ?)
  `;

  let error = null;
  let result = null;

  try {

    const ingredientResult = await query(ingredientSql, [ingredientId, ingredient]);
    result = ingredientResult;

  } catch (e) {

    error = e.message;
    console.error("Error in create function:", error);

  } finally {

    return { error, result, ingredientId };

  }
};

/****************************** Read One ******************************/

const readOne = async (ingredientId) => {

  const sql = `
        SELECT ingredient, ingredient_id
        FROM ingredient 
        WHERE ingredient_id = ?
    `;

  let error = null;
  let result = null;

  try {

    result = await query(sql, [ingredientId]);

  } catch (e) {

    error = e.message;

  } finally {

    return { error, result };

  }
};

/****************************** Read All ******************************/

const readAll = async () => {

  const sql = `
        SELECT ingredient_id, ingredient
        FROM ingredient
        ORDER BY ingredient
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

const update = async (ingredientId, ingredient) => {

  const sql = `
      UPDATE ingredient
      SET ingredient = ? 
      WHERE ingredient_id = ?
  `;

  let error = null;
  let result = null;

  try {

    result = await query(sql, [ingredient, ingredientId]);

    if (result.affectedRows !== 1) throw new Error("Ingredient didn't update ");

  } catch (e) {

    error = e.message;

  } finally {

    return { error, result };

  }
};

/****************************** Delete One ******************************/

const deleteOne = async (ingredientId) => {

  const ingredientSql = `
      DELETE FROM ingredient
      WHERE ingredient_id = ?
  `;

  let error = null;
  let result = null;

  try {

    result = await query(ingredientSql, [ingredientId]);

    if (result.affectedRows !== 1) throw new Error("Ingredient didn't delete ");

  } catch (e) {

    error = e.message;

  } finally {

    return { result, error };

  }
};

export const IngredientDB = { readAll, readOne, create, deleteOne, update };
