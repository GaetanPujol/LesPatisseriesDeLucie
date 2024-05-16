import Axios from "./caller.service";

let getAllUsers = () => {

    return Axios.get("/users/all");

}

let getUser = (uid) => {

    return Axios.get(`/users/${uid}`);

}

let addUser = (user) => {

    return Axios.post("/users", user);

}

let updateUser = (user) => {

    return Axios.put(`/users/edit/${user.userId}`, user);

}

let adminUpdateUser = (user) => {

    return Axios.put(`/users/admin/user/edit/${user.userId}`, user);

}

let deleteUser = (uid, config) => {

    return Axios.delete(`/users/${uid}`, config);

}


export const userService = { getAllUsers, getUser, updateUser, deleteUser, addUser, adminUpdateUser };
