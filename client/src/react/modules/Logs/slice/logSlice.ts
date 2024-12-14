import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
    logs: any[],
    filters: {
        type: string,
        status: string
    }
}

const initialState : initialStateType = {
    logs: [],
    filters: {
        type: "all",
        status: "all"
    }
}

const logSlice = createSlice({
    name: "logSlice",
    initialState,
    reducers: { 
        changeFilters: (state, action : PayloadAction<{key: "type" | "status", value: any}>) => {
            state.filters[action.payload.key] = action.payload.value;
        },
        setLogs: (state, action) => {
            state.logs = action.payload;
        },
        clearLogs: (state) => {
            state.logs = [];
        }
    }
})

const { actions, reducer } = logSlice;
export default reducer;
export const { setLogs, clearLogs, changeFilters } = actions;