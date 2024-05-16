import { CommentDB } from "../databases/comment.db.js";

/****************************** Create ******************************/

const create = async(req, res) => {
  const { content, recipeId, userId } = req.body;

  if (!recipeId) return res.status(400).json({ message: "Recipe ID is required." });

  const response = await CommentDB.create(content, recipeId, userId);
  if (response.error) {
    console.error("Database error:", response.error);
    return res.status(500).json({ message: "Internal server error." });
  }

  return res.status(201).json({ message: `Comment created` });
};

/****************************** Read One ******************************/

const readOne = async(req, res) => {

  const commentId = req.params.commentId;
  const response = await CommentDB.readOne(commentId);
  const result = response.result;

  if (!result || result.length === 0) return res.status(404).json({ message: "Comment not found" });

  const comment = {
    commentId,
    content: result[0].content,
    recipeId: result[0].recipe_id,
    userId: result[0].user_id
  };

  return res.status(200).json({ message: "Request OK", comment });

};

/****************************** Read All ******************************/

const readAll = async(req, res) => {

  const commentResponse = await CommentDB.readAll();
  const comments = commentResponse.result;

  return res.status(200).json({ message: "Request OK", comments });

};

/****************************** Read Comments By User ******************************/

const readCommentsByUser = async(req, res) => {

  const userId = req.params.userId;
  const commentResponse = await CommentDB.readCommentsByUser(userId);
  const comments = commentResponse.result;

  if (commentResponse.error) {

    console.error("Database error:", commentResponse.error);
    return res.status(500).json({ message: "Internal server error." });

  }

  return res.status(200).json({ message: "Request OK", comments });

};

/****************************** Read Comments By Recipe ******************************/

const readCommentsByRecipe = async(req, res) => {

  const recipeId = req.params.recipeId;
  const commentResponse = await CommentDB.readCommentsByRecipe(recipeId);
  const comments = commentResponse.result;

  if (commentResponse.error) {

    console.error("Database error:", commentResponse.error);
    return res.status(500).json({ message: "Internal server error." });

  }

  return res.status(200).json({ message: "Request OK", comments });

};

/****************************** Update ******************************/

const update = async(req, res) => {

  const commentId = req.params.commentId;
  const content = req.body.content;

  const response = await CommentDB.update(content, commentId);

  if (response.error) return res.status(500).json({ message: response.error });

  return res.status(200).json({ message: `Comment number ${commentId} has been edited` });

};

/****************************** Delete One ******************************/

const deleteOne = async(req, res) => {

  const commentId = req.params.commentId;

  const response = await CommentDB.deleteOne(commentId);

  let error = response.error;

  if (error) return res.status(500).json({ message: error });

  else return res.status(200).json({ message: "Comment deleted" });

};


export const CommentController = { create, readAll, readCommentsByUser, readCommentsByRecipe, deleteOne, readOne, update };
