import React from "react";
import { View, Text } from "react-native";
import HomeScreen from "../../containers/HomeScreen/HomeScreen";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootNavigatorProps, RouteParams } from "../Navigation/RootNavigator";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { Auth } from "../../actions/auth";
import { FC_Login, FC_CheckLoggedIn } from "../../actions";

const _BottomNavTabs = (props: RootNavigatorProps) => {
  const Tab = createBottomTabNavigator<RouteParams>();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === "ChatPage") {
              iconName = focused ? "ios-list-box" : "ios-list";
            }

            // You can return any component that you like here!
            return <EntypoIcon name={"users"} size={35} color="#abbeff" />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
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

export const BottomNavTabs = connect(mapStateToProps, {
  FC_Login,
  FC_CheckLoggedIn,
})(_BottomNavTabs);
