import { LoginSuccessDetails, LogoutUser, user_details_data } from "./auth";
import { NewConnectionAction } from "./socket";

export enum ActionTypes {
  USER_LOGIN_SUCCESS_DATA = "USER_LOGIN_SUCCESS_DATA",
  LOGOUT = "LOGOUT",
  SOCKET_NEW_CONNECTION = "SOCKET_NEW_CONNECTION",
}

export type Action = LoginSuccessDetails | LogoutUser | NewConnectionAction;
