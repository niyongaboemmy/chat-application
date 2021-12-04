import { combineReducers } from "redux";
import { authReducer } from "./auth";

import { Auth, Socket } from "../actions";
import { socketReducer } from "./socket";

export interface StoreState {
  auth: Auth;
  socket: Socket;
}

export const reducers = combineReducers<StoreState>({
  auth: authReducer,
  socket: socketReducer,
});
