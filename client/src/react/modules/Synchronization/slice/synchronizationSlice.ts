import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DbDataType = {
    host: string;
    user: string;
    password: string;
    database: string;
}

type MappingFieldType = {
    old: string;
    new: string;
}

type PlanningType = {
    mode: 'single' | 'recurring';
    name: string;
    selectedDays: string[];
    time: string;
}

type SynchronizationStateType = {
    platform: string;
    query: string;
    dbData: DbDataType;
    mappingType: string;
    mapping: MappingFieldType[];
    planning: PlanningType;
}

const initialState: SynchronizationStateType = {
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
    ],
    planning: {
        mode: "single",
        name: "",
        selectedDays: [],
        time: ""
    }
};

const synchronizationSlice = createSlice({
    name: "synchronizationSlice",
    initialState,
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
        setPlanningMode(state, action) {
            state.planning.mode = action.payload;
        },
        setPlanningDays(state, action) {
            state.planning.selectedDays = action.payload;
        },
        setPlanningTime(state, action) {
            state.planning.time = action.payload
        },
        setPlanningName(state, action) {
            state.planning.name = action.payload;
        }
    },
})

const {reducer, actions} = synchronizationSlice

export default reducer;
export const { 
    setPlatform, 
    setQuery, 
    setDbData, 
    setMappingType, 
    setMapping, 
    setPlanningDays, 
    setPlanningMode, 
    setPlanningTime ,
    setPlanningName
} = actions;
