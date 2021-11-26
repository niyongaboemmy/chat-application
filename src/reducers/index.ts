import { combineReducers } from "redux";
import { authReducer } from "./auth";

import { Auth } from "../actions";

// define the entire state into the entire sire
export interface StoreState {
  auth: Auth;
}

export const reducers = combineReducers<StoreState>({
  auth: authReducer,
});
