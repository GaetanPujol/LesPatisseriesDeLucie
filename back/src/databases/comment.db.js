import query from "./init.db.js";
import { v4 as uuidv4 } from 'uuid';

/****************************** Create ******************************/

const create = async (content, recipeId, userId) => {

  const commentId = uuidv4();

  const sql = `
        INSERT INTO comments (comment_id, content, recipe_id, user_id)
        VALUES (?, ?, ?, ?)
    `;

  let error = null;
  let result = null;

  try {

    result = await query(sql, [commentId, content, recipeId, userId]);

  } catch (e) {

    error = e.message;

  } finally {

    return { error, result };

  }
};

/****************************** Read One ******************************/

const readOne = async (commentId) => {

  const sql = `
        SELECT content, comment_id, recipe_id, user_id
        FROM comments 
        WHERE comment_id = ?
    `;

  let error = null;
  let result = null;

  try {

    result = await query(sql, [commentId]);

  } catch (e) {

    error = e.message;

  } finally {

    return { error, result };

  }
};

/****************************** Read All ******************************/

const readAll = async () => {

  const sql = `
    SELECT comments.recipe_id, comments.user_id, comments.content, comments.date
    FROM comments
  `;

  let error = null;
  let result = null;

  try {

    result = await query(sql);

  } catch (e) {

    error = e.message;

  } finally {

    return { error, result };

  }
};

/****************************** Read Comments By User ******************************/

const readCommentsByUser = async (userId) => {

  const sql = `
    SELECT comments.recipe_id, comments.user_id,comments.content,comments.date
    FROM comments
    WHERE comments.user_id = ?
  `;

  let error = null;
  let result = null;

  try {

    result = await query(sql, [userId]);

  } catch (e) {

    error = e.message;

  } finally {

    return { error, result };

  }
};

/****************************** Read Comments By Recipe ******************************/

const readCommentsByRecipe = async (recipeId) => {

  const sql = `
    SELECT comments.recipe_id, comments.user_id, comments.content, 
    comments.date
    FROM comments
    WHERE comments.recipe_id = ?
  `;

  let error = null;
  let result = null;

  try {

    result = await query(sql, [recipeId]);

  } catch (e) {

    error = e.message;

  } finally {

    return { error, result };

  }
};

/****************************** Update ******************************/

const update = async (content, commentId) => {

  const sql = `
      UPDATE comments
      SET content = ? 
      WHERE comment_id = ?
  `;

  let error = null;
  let result = null;

  try {

    result = await query(sql, [content, commentId]);

    if (result.affectedRows !== 1) throw new Error("Comment didn't update ");

  } catch (e) {

    error = e.message;

  } finally {

    return { error, result };

  }
};

/****************************** Delete One ******************************/

const deleteOne = async (commentId) => {

  const commentSql = `
      DELETE FROM comments
      WHERE comment_id = ?
  `;

  let error = null;
  let result = null;

  try {

    result = await query(commentSql, [commentId]);

    if (result.affectedRows !== 1) throw new Error("comment didn't delete ");

  } catch (e) {

    error = e.message;

  } finally {

    return { result, error };

  }
};


export const CommentDB = { create, readAll, readCommentsByUser, readCommentsByRecipe, deleteOne, readOne, update };
