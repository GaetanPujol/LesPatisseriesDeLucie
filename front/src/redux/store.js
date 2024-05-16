import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducer";


const store = configureStore({

  reducer: {

    userState: userReducer,

  },
});

export default store;
