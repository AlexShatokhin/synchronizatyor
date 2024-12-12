import { configureStore } from "@reduxjs/toolkit";
import NavigationMenu from "../modules/NavigationMenu/slice/NavigationMenuSlice"
import userData from "../slice/userSlice"

const store = configureStore({
    reducer: {
      NavigationMenu,
      userData
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;