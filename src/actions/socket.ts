import { ActionTypes } from "./types";
import { Dispatch } from "redux";

/**
 * * ****************************** INTERFACES *****************************
 */

export interface Socket {
  socket: any;
}

export interface NewConnectionAction {
  type: ActionTypes.SOCKET_NEW_CONNECTION;
  payload: number;
}

/**
 * * ****************************** ACTIONS *****************************
 */

export const setNewConnection =
  (connection: any) => async (dispatch: Dispatch) => {
    return dispatch<NewConnectionAction>({
      type: ActionTypes.SOCKET_NEW_CONNECTION,
      payload: connection,
    });
  };
