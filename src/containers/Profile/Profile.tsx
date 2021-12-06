import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { Auth } from "../../actions/auth";
import { FC_Login, FC_CheckLoggedIn } from "../../actions";
import tw from "tailwind-react-native-classnames";
import OctIcon from "react-native-vector-icons/Octicons";
import AntIcon from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteParams } from "../../components/Navigation/RootNavigator";

interface ProfileProps {
  auth: Auth;
  FC_CheckLoggedIn: () => void;
}

const _Profile = (props: ProfileProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
  return (
    <SafeAreaView style={tw`h-full bg-blue-700`}>
      <StatusBar
        animated={true}
        backgroundColor="#1d4ed8"
        barStyle="light-content"
        showHideTransition="fade"
        hidden={false}
      />
      <View style={tw`bg-blue-700 px-5 py-4`}>
        <View style={tw`flex flex-row items-center justify-between`}>
          <View style={tw`flex flex-row items-center`}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ChatPage")}
              style={tw`mr-4`}
            >
              <IonIcon name="arrow-back" size={35} color="#abbeff" />
            </TouchableOpacity>
            <View>
              <Text style={tw`text-white text-2xl font-bold`}>My profile</Text>
              {/* <Text style={tw`text-blue-300 -mt-1`}>
                Choose a friend to chat with
              </Text> */}
            </View>
          </View>
          <View style={tw`flex flex-row items-center`}></View>
        </View>
      </View>
      <View style={tw`bg-white h-full`}>
        <View
          style={tw`flex flex-row items-center justify-between mx-3 py-4 border-b border-gray-300`}
        >
          <Text style={tw`text-lg text-gray-500 mr-4`}>First name:</Text>
          <Text style={tw`font-bold text-lg`}>{props.auth.user?.fname}</Text>
        </View>
        <View
          style={tw`flex flex-row items-center justify-between mx-3 py-4 border-b border-gray-300`}
        >
          <Text style={tw`text-lg text-gray-500 mr-4`}>Last name:</Text>
          <Text style={tw`font-bold text-lg`}>{props.auth.user?.lname}</Text>
        </View>
        <View
          style={tw`flex flex-row items-center justify-between mx-3 py-4 border-b border-gray-300`}
        >
          <Text style={tw`text-lg text-gray-500 mr-4`}>Username:</Text>
          <Text style={tw`font-bold text-lg`}>{props.auth.user?.fname}</Text>
        </View>
        <View
          style={tw`flex flex-row items-center justify-between mx-3 py-4 border-b border-gray-300`}
        >
          <Text style={tw`text-lg text-gray-500 mr-4`}>Account category:</Text>
          <Text style={tw`font-bold text-lg capitalize`}>
            {props.auth.user?.user_category}
          </Text>
        </View>
      </View>
    </SafeAreaView>
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

export const Profile = connect(mapStateToProps, {
  FC_Login,
  FC_CheckLoggedIn,
})(_Profile);
