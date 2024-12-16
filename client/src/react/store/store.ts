import { configureStore } from "@reduxjs/toolkit";
import NavigationMenu from "../modules/NavigationMenu/slice/NavigationMenuSlice"
import userData from "../slice/userSlice"
import logSlice from "../modules/Logs/slice/logSlice"
import tasksSlice from "../modules/Synchronization/slice/tasksSlice"

const store = configureStore({
    reducer: {
      NavigationMenu,
      userData,
      logSlice,
      tasksSlice
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;