import query from "./init.db.js";
import { v4 as uuidv4 } from 'uuid';

/****************************** Create ******************************/

const create = async(email, password, pseudo = "Anonyme") => {

  const userId = uuidv4();
  const profile_picture = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";
  const role = "member";
  const sql = `INSERT INTO users (user_id, pseudo ,email, profile_picture, password, role )
    VALUES (?, ?, ?, ?, ?, ?)`;

  let error = null;
  let result = null;

  try {

    result = await query(sql, [userId, pseudo, email, profile_picture, password, role]);

  }
  catch (e) {

    error = e.message;

  }
  finally {

    return { error, result };

  }
};

/****************************** Read One ******************************/

const readOne = async(userId) => {

  const sql = `
        SELECT users.user_id, pseudo,email, password, profile_picture,role
        FROM users
        WHERE  users.user_id = ?
    `;

  let error = null;
  let result = null;

  try {

    result = await query(sql, [userId]);

  }
  catch (e) {

    error = e.message;

  }
  finally {
    console.log(result)
    return { error, result };

  }
};

/****************************** Read All ******************************/

const readAll = async() => {

  const sql = `
    SELECT 
      users.pseudo, users.email, users.profile_picture, users.role, users.user_id
    FROM users
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

/****************************** Read By Email ******************************/

const readByEmail = async(email) => {

  const sql = `
       SELECT user_id, email, password
       FROM users
       WHERE email = ?`;

  let error = null;
  let result = null;

  try {

    result = await query(sql, [email]);

  }
  catch (e) {

    error = e.message;

  }
  finally {

    return { error, result };

  }
};

/****************************** Delete User And Comments ******************************/

const deleteUserAndComments = async(userId) => {

  let error = null;
  let result = null;

  try {

    await query("START TRANSACTION");
    await query("DELETE FROM comments WHERE user_id = ?", [userId]);

    result = await query("DELETE FROM users WHERE user_id = ?", [userId]);

    await query("COMMIT");

    if (result.affectedRows !== 1) throw new Error("User didn't delete ");

  }
  catch (e) {

    await query("ROLLBACK");
    error = e.message;

  }
  finally {

    return { error, result };

  }
};

/****************************** Update ******************************/

const update = async(pseudo, email, password, profile_picture, userId) => {

  const updateUserSql = `
        UPDATE users
        SET pseudo = ?, email = ?, password = ?, profile_picture = ?
        WHERE user_id = ?
  `;

  let error = null;
  let result = null;

  try {

    await query(updateUserSql, [pseudo, email, password, profile_picture, userId]);

    result = await readOne(userId);

  }
  catch (e) {

    error = e.message;

  }
  finally {

    return { error, result };

  }
};

/****************************** Update Admin ******************************/

const updateAdmin = async(pseudo, email, password, profile_picture, role, userId) => {

  const updateUserSql = `
        UPDATE users
        SET pseudo = ?, email = ?, password = ?, profile_picture = ?, role=?
        WHERE user_id = ?
  `;

  let error = null;
  let result = null;

  try {

    await query(updateUserSql, [pseudo, email, password, profile_picture, role, userId]);

    result = await readOne(userId);

  }
  catch (e) {

    error = e.message;

  }
  finally {

    return { error, result };

  }
};




export const UserDB = { create, readByEmail, deleteUserAndComments, update, readOne, readAll, updateAdmin };
