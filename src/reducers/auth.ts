import { Auth } from "../actions/auth";
import { Action, ActionTypes } from "../actions";
import { APP_TOKEN_NAME } from "../utils/AxiosToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
const defaultState = {
  loading: true,
  isAuthenticated: false,
  token: null,
  user: null,
} as Auth;

/**
 * this is the comment
 * @param state
 * @param action
 * @returns
 */
export const authReducer = (state: Auth = defaultState, action: Action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_SUCCESS_DATA:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.token ? action.payload.data : null,
        token: action.payload.token,
      } as Auth;
    case ActionTypes.LOGOUT:
      if (action.payload === true) {
        AsyncStorage.removeItem(APP_TOKEN_NAME);
      }
      return {
        ...defaultState,
        loading: false,
      };
    default:
      return state;
  }
};
