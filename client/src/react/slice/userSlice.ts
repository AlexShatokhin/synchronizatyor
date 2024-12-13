import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        name: null,
        email: null,
        isAuthenticated: false,
    },
    reducers: {
      login: (state, action) => {
        const { id, name, email } = action.payload;
        state.id = id;
        state.name = name;
        state.email = email;
        state.isAuthenticated = true;

        sessionStorage.setItem("user", JSON.stringify(action.payload));
      },
      logout: (state) => {
        state.id = null;
        state.name = null;
        state.email = null;
        state.isAuthenticated = false;

        sessionStorage.removeItem("user");
      },
    },
  });
  
  export const { login, logout } = userSlice.actions;
  export default userSlice.reducer;