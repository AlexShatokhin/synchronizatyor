import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
    activeElement: "logs" | "home" | "settings";
}

const initialState : initialStateType = {
    activeElement: "logs",
}

const NavigationMenuSlice = createSlice({
    name: "NavigationMenu",
    initialState,
    reducers: {
        changeActiveElement: (state, action : PayloadAction<"logs" | "home" | "settings">) => {
            state.activeElement = action.payload;
        },
    },
})

const { actions, reducer } = NavigationMenuSlice;
export const { changeActiveElement } = actions;
export default reducer;