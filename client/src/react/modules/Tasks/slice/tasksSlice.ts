import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const tasksSlice = createSlice({
    name: "tasksSlice",
    initialState: {
        platform: "json",
        query: "",
        dbData: {
            host: "",
            user: "",
            password: "",
            database: ""
        },
        mappingType: "rename",
        mapping: [
            {
                old: "",
                new: ""
            }
        ]
    },
    reducers: {
        setPlatform(state, action) {
            state.platform = action.payload;
        },
        setQuery(state, action) {
            state.query = action.payload;
        },
        setDbData(state, action : PayloadAction<{key: "host" | "user" | "password" | "database", value: string}>) {
            state.dbData[action.payload.key] = action.payload.value;
        },
        setMappingType(state, action) {
            state.mappingType = action.payload;
        },
        setMapping(state, action) {
            state.mapping = action.payload;
        },
    },
})

export const { setPlatform, setQuery, setDbData, setMappingType, setMapping } = tasksSlice.actions;
export default tasksSlice.reducer;