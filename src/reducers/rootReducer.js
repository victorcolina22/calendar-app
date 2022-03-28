import { combineReducers } from "redux";
import { calendarReducer } from "./calendarReduce";

import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer
    // TODO: authReducer 
});