import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    credentials: {},
    vecesLoginLogout: 0,
  },

  reducers: {
    login: (state, action) => {
      return {
        ...state,
        ...action.payload,
        vecesLoginLogout: state.vecesLoginLogout + 1,
      };
    },

    logout: (state, action) => {
      return {
        ...state,
        ...action.payload,
        vecesLoginLogout: state.vecesLoginLogout + 1,
      };
    },

    resetLog: (state) => {
      return {
        ...state,
        vecesLoginLogout: 0,
      };
    },
  },
});

export const { login, logout } = userSlice.actions;

export const userData = (state) => state.user;
export default userSlice.reducer;
