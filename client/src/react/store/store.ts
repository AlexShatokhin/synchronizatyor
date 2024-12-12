import { configureStore } from "@reduxjs/toolkit";
import NavigationMenu from "../modules/NavigationMenu/slice/NavigationMenuSlice"

const store = configureStore({
    reducer: {
      NavigationMenu
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;