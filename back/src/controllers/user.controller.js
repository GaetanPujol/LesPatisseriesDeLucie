import isEmail from "validator/lib/isEmail.js";
import { UserDB } from "../databases/user.db.js";
import { jwtSign } from "../middlewares/jwt.mdlwr.js";
import { hashPass, compareHash } from "../utils/crypto.utils.js";
import { stringsAreFilled } from "../utils/string.utils.js";

/****************************** Create ******************************/

const create = async(req, res) => {

  const { email, password, pseudo, profile_picture } = req.body;
  const areStrings = stringsAreFilled([email, password]);

  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  if (!isEmail(email)) return res.status(403).json({ message: `Invalid email` });

  const hashResult = await hashPass(password);
  const hashErr = hashResult.error;

  if (hashErr) return res.status(500).json({ message: hashErr });

  const { error, result } = await UserDB.create(email, hashResult.hashed, pseudo, profile_picture);

  if (error) return res.status(500).json({ message: error });

  return res.status(201).json({ message: "User created", userId: result.insertId });

};

/****************************** Read One ******************************/

const readOne = async(req, res) => {

  const userId = req.params.userId;
  const response = await UserDB.readOne(userId);
  const result = response.result;

  if (!result || result.length === 0) return res.status(404).json({ message: "User not found" });

  const user = { userId, pseudo: result[0].pseudo, email: result[0].email, password: result[0].password, profile_picture: result[0].profile_picture };

  return res.status(200).json({ message: "User OK", user });

};

/****************************** Read All ******************************/

const readAll = async(req, res) => {
  const userResponse = await UserDB.readAll();

  const users = userResponse.result;


  return res.status(200).json({ message: "Request OK", users });

};

/****************************** Sign In ******************************/

const signIn = async(req, res) => {

  const { email, password } = req.body;
  const { error, result } = await UserDB.readByEmail(email);

  if (error) return res.status(500).json({ message: error });

  if (result.length === 0) return res.status(401).json({ message: `Authentication failed` });


  const user = result[0];
  const userId = user.user_id;
  const hashedPass = user.password;
  const passwordOk = await compareHash(password, hashedPass);

  if (!passwordOk) return res.status(401).json({ message: `Authentication failed` });

  const token = jwtSign(userId);

  return res.status(200).json({ message: "login succes", user: { userId, email }, token });

};

/****************************** Delete User ******************************/

const deleteUser = async(req, res) => {

  const userId = req.params.userId;

  if (!userId) return res.status(400).json({ message: "User ID is missing" });

  const { error, result } = await UserDB.deleteUserAndComments(userId);

  if (error) return res.status(500).json({ message: error });

  if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });

  return res.status(200).json({ message: "User and associated comments deleted successfully" });

};

/****************************** Update ******************************/

const update = async(req, res) => {

  const userId = req.params.userId;
  const { pseudo, email, password, profile_picture } = req.body;
  const areStrings = stringsAreFilled([email, password]);

  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  if (!isEmail(email)) return res.status(403).json({ message: `Invalid email` });

  const hashResult = await hashPass(password);
  const hashErr = hashResult.error;

  if (hashErr) return res.status(500).json({ message: hashErr });

  const response = await UserDB.update(pseudo, email, hashResult.hashed, profile_picture, userId);

  if (response.error) return res.status(500).json({ message: response.error });

  return res.status(200).json({ message: `User number ${userId} has been edited` });

};

/****************************** UpdateAdmin ******************************/

const updateAdmin = async(req, res) => {

  const userId = req.params.userId;
  const { pseudo, email, password, profile_picture, role } = req.body;
  const areStrings = stringsAreFilled([email, password]);

  if (!areStrings) return res.status(403).json({ message: `Missing data` });

  if (!isEmail(email)) return res.status(403).json({ message: `Invalid email` });

  const hashResult = await hashPass(password);
  const hashErr = hashResult.error;

  if (hashErr) return res.status(500).json({ message: hashErr });

  const response = await UserDB.update(pseudo, email, hashResult.hashed, profile_picture, role, userId);

  if (response.error) return res.status(500).json({ message: response.error });

  return res.status(200).json({ message: `User number ${userId} has been edited` });

};


export const UserController = { create, signIn, deleteUser, update, readOne, readAll, updateAdmin };
