import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
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
    <View>
      <View style={tw`bg-blue-700 px-5 py-4 pt-16`}>
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
          <View style={tw`flex flex-row items-center`}>
            <TouchableOpacity
              style={tw`flex flex-row items-center`}
              onPress={() => alert("Hello")}
            >
              {/* <AntIcon name="search1" size={30} color="#abbeff" /> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert("Hello")}
              style={tw`bg-blue-600 p-2 rounded-full ml-3 -mr-3`}
            >
              {/* <MaterialIcon name="more-vert" size={30} color="#abbeff" /> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
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
