import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../containers/HomeScreen/HomeScreen";
import LoginScreen from "../../containers/LoginScreen/LoginScreen";
import RegisterScreen from "../../containers/RegisterScreen/RegisterScreen";
import tw from "tailwind-react-native-classnames";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { Auth } from "../../actions/auth";
import { FC_Login, FC_CheckLoggedIn } from "../../actions";
import { ChatScreen } from "../../containers/ChatScreen/ChatScreen";
import { Profile } from "../../containers/Profile/Profile";

export type RouteParams = {
  Home: undefined;
  Login: {
    action: string;
    redirectedPage: string;
  };
  Register: undefined;
  ChatPage: undefined;
  Profile: undefined;
};

export interface RootNavigatorProps {
  auth: Auth;
  FC_CheckLoggedIn: () => void;
}

const Stack = createNativeStackNavigator<RouteParams>();

const _RootNavigator = (props: RootNavigatorProps) => {
  // useEffect(() => {
  if (props.auth.isAuthenticated === false) {
    props.FC_CheckLoggedIn();
  }
  // }, [props]);
  return (
    <Stack.Navigator>
      <Stack.Group>
        {props.auth.isAuthenticated === false && (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              // headerStyle: tw`bg-white`,
              // headerTintColor: "#FFF",
              // headerTitleStyle: tw`text-sm`,
              // headerBackVisible: false,
              // headerShadowVisible: false,
              headerShown: false,
            }}
          />
        )}
        {props.auth.isAuthenticated === false && (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
        )}
        {props.auth.isAuthenticated === false && (
          <Stack.Screen name="Register" component={RegisterScreen} />
        )}
        {props.auth.isAuthenticated === true && (
          <Stack.Screen
            name="ChatPage"
            component={ChatScreen}
            options={{
              headerShown: false,
            }}
          />
        )}
        {props.auth.isAuthenticated === true && (
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Group>
    </Stack.Navigator>
  );
};

const mapStateToProps = ({
  auth,
}: StoreState): {
  auth: Auth;
} => {
  return {
    auth: auth,
  };
};

export const RootNavigator = connect(mapStateToProps, {
  FC_Login,
  FC_CheckLoggedIn,
})(_RootNavigator);
