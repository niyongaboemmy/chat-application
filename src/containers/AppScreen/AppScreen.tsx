import React, { Component } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootNavigator } from "../../components/Navigation/RootNavigator";
import io from "socket.io-client";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { Auth } from "../../actions/auth";
import {
  FC_Login,
  FC_CheckLoggedIn,
  Socket,
  setNewConnection,
} from "../../actions";
import { SOCKET_API } from "../../utils/api";

interface AppProps {
  auth: Auth;
  socket: Socket;
  setNewConnection: (connection: any) => void;
}

interface AppState {}

const Stack = createNativeStackNavigator();
const connectionName = io(SOCKET_API);
export class _App extends Component<AppProps, AppState> {
  componentDidMount = () => {
    this.props.setNewConnection(connectionName);
    connectionName.on("connection", () => alert("Connected successfully"));
  };
  render() {
    return (
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );
  }
}

const mapStateToProps = ({
  auth,
  socket,
}: StoreState): {
  auth: Auth;
  socket: Socket;
} => {
  return {
    auth: auth,
    socket: socket,
  };
};

const App = connect(mapStateToProps, {
  FC_Login,
  FC_CheckLoggedIn,
  setNewConnection,
})(_App);

export default App;
