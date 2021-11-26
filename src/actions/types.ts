import { LoginSuccessDetails, LogoutUser, user_details_data } from "./auth";

export enum ActionTypes {
  USER_LOGIN_SUCCESS_DATA = "USER_LOGIN_SUCCESS_DATA",
  LOGOUT = "LOGOUT",
}

export type Action = LoginSuccessDetails | LogoutUser;
