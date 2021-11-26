import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { styles } from "../../components/styles/styles";
import MdIcon from "react-native-vector-icons/MaterialIcons";
import ButtonItem, { ButtonThemes } from "../../components/styles/ButtonItem";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { RouteParams } from "../../components/Navigation/RootNavigator";
import PublicHeader from "../../components/PublicHeader/PublicHeader";
// const navigation = useNavigation();
interface HomeScreenContentProps {
  navigation: NativeStackNavigationProp<RouteParams>;
}
interface HomeScreenContentState {}
class HomeScreenContent extends Component<
  HomeScreenContentProps,
  HomeScreenContentState
> {
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={tw`h-full bg-white`}>
        <ScrollView>
          <PublicHeader />
          <View style={tw`flex flex-row items-center justify-center mt-5 mb-5`}>
            <Text style={tw`font-extrabold text-3xl`}>Welcome to chat</Text>
          </View>
          <View style={tw`flex flex-row items-center justify-center mb-6 mx-3`}>
            <Text style={tw`text-base text-center`}>
              Fewer meetings, fast communication, encryption technology, all
              integrated
            </Text>
          </View>
          <View style={tw`flex flex-row items-center justify-center my-5`}>
            <Image
              style={{
                resizeMode: "contain",
              }}
              source={require("../../assets/illustration.png")}
            />
          </View>
          <View
            style={tw`flex flex-col items-center justify-center w-full px-8`}
          >
            <ButtonItem
              onPress={() => {
                navigation.navigate("Register");
              }}
              title="Sign up"
              theme={ButtonThemes.Primary}
              style="mb-3 w-full"
            />
            <ButtonItem
              onPress={() => {
                console.log("Click to login");
                navigation.navigate("Login", {
                  action: "Login action",
                  redirectedPage: "Chat page",
                });
              }}
              title="Sign in"
              theme={ButtonThemes.Default}
              style="mb-3 w-full"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
  return <HomeScreenContent navigation={navigation} />;
};

export default HomeScreen;
