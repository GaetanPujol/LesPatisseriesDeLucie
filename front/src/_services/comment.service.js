import Axios from "./caller.service";

let readCommentsByRecipe = (recipeId) => {

    return Axios.get(`/comments/recipe/${recipeId}`);

}

let addComment = (comment) => {
    return Axios.post("/comments", comment);
};

export const commentService = { readCommentsByRecipe, addComment };
