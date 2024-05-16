import { createSlice } from "@reduxjs/toolkit";

const USER_STATE = {

  signUpForm: {

    email: "",
    pseudo: "",
    password: "",
    confirmPass: "",

  },

  loading: false,

  user: {

    email: "",
    pseudo: "",

  },
};

const userSlice = createSlice({

  name: "user",
  initialState: USER_STATE,
  reducers: {

    setUser: (state, action) => {

      const { email, pseudo } = action.payload;

      return {

        ...state,

        user: {

          ...state.user,
          email,
          pseudo,

        },
      };
    },

    updateSignUpForm: (state, action) => {

      const { value, inputName } = action.payload;

      return {

        ...state,

        signUpForm: {

          ...state.signUpForm,
          [inputName]: value,

        },
      };
    },

    startSignUpLoading: (state, action) => {

      return { ...state, loading: true };

    },

    stopSignUpLoading: (state, action) => {

      return { ...state, loading: false };

    },
  },
});

export const { setUser, updateSignUpForm, startSignUpLoading, stopSignUpLoading } =
userSlice.actions;

export default userSlice.reducer;
