import React, { Component } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootNavigator } from "../../components/Navigation/RootNavigator";

const Stack = createNativeStackNavigator();
export class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );
  }
}

export default App;
