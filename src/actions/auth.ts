// import axios from "axios";
import axios from "axios";
import { Dispatch } from "redux";
import { API } from "../utils/api";
import { APP_TOKEN_NAME, setAxiosToken } from "../utils/AxiosToken";
import { ActionTypes } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const RunWithAuthentication = async (MyFunction: Function) => {
  let tokenName = null;
  try {
    const res_token = await AsyncStorage.getItem(APP_TOKEN_NAME);
    tokenName = res_token;
    var headers = {
      "Content-Type": "application/json",
      "x-auth-token": tokenName,
    };
    MyFunction({
      headers: headers,
    });
  } catch (error) {}
  if (tokenName === null) {
    return false;
  }
};

/**
 * * ****************************** INTERFACES *****************************
 */
export interface user_details_data {
  user_id: string;
  names: string;
}

//* ********************** ACTION TYPE INTERCACES ********************** */

export interface LoginSuccessDetails {
  type: ActionTypes.USER_LOGIN_SUCCESS_DATA;
  payload: UserLoginDetails;
}

export interface LogoutUser {
  type: ActionTypes.LOGOUT;
  payload: boolean;
}

export interface UserDetails {
  user_id: string;
  user_category_id: number;
  fname: string;
  lname: string;
  username: string;
  user_category: string;
  status: number;
}

export interface Auth {
  loading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  user: UserDetails | null;
}

export interface UserLoginDetails {
  token: string;
  data: UserDetails;
}

/**
 * * ****************************** ACTIONS *****************************
 */

/**
 * @description change where the user will receive the code (email | sms)
 * @param type
 * @returns
 */
export const FC_Login = (
  data: {
    username: string;
    password: string;
  },
  callback: (
    status: boolean,
    feedback: {
      status: boolean;
      msg: string;
    }
  ) => void
) => {
  console.log("Sent data: ", data);
  return async (dispatch: Dispatch) => {
    callback(true, {
      status: true,
      msg: "",
    });
    try {
      const res = await axios.post<UserLoginDetails>(`${API}/auth/login`, data);
      AsyncStorage.setItem(APP_TOKEN_NAME, res.data.token);
      dispatch<LoginSuccessDetails>({
        type: ActionTypes.USER_LOGIN_SUCCESS_DATA,
        payload: res.data,
      });
      callback(false, {
        status: true,
        msg: "Logged in successfully!",
      });
      console.log("Login success: ", res.data.token);
    } catch (error: any) {
      console.log("Before...", { ...error });
      if (error.response !== undefined) {
        console.log("Check one...");

        callback(false, {
          status: true,
          msg: error.response.data.msg,
        });
      } else {
        console.log("Check two...");

        callback(false, {
          status: true,
          msg: "Error occurred, Please try again",
        });
      }
    }
  };
};

export const FC_CheckLoggedIn = () => {
  return async (dispatch: Dispatch) => {
    let tokenName = null;
    try {
      const res_token = await AsyncStorage.getItem(APP_TOKEN_NAME);
      tokenName = res_token;
    } catch (error) {}
    if (tokenName === null) {
      // alert("Invalid user");
      // dispatch<LogoutUser>({
      //   type: ActionTypes.LOGOUT,
      //   payload: false,
      // });
      return false;
    }
    try {
      setAxiosToken();
      var headers = {
        "Content-Type": "application/json",
        "x-auth-token": tokenName,
      };
      const res = await axios.get<UserDetails>(`${API}/auth/currentuser`, {
        headers: headers,
      });
      console.log("my: ", res.data);
      dispatch<LoginSuccessDetails>({
        type: ActionTypes.USER_LOGIN_SUCCESS_DATA,
        payload: {
          token: tokenName,
          data: res.data,
        },
      });
    } catch (error: any) {
      console.log("token: ", tokenName);
      console.log("Err: ", { ...error });
      dispatch<LogoutUser>({
        type: ActionTypes.LOGOUT,
        payload: true,
      });
    }
  };
};

export const FC_Logout = () => {
  return (dispatch: Dispatch) => {
    dispatch<LogoutUser>({
      type: ActionTypes.LOGOUT,
      payload: true,
    });
  };
};
