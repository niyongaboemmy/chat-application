import { Socket, Action, ActionTypes } from "../actions";

export const socketReducer = (
  state: Socket = { socket: null },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.SOCKET_NEW_CONNECTION:
      return { socket: action.payload };
    default:
      return state;
  }
};
