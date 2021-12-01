import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import OctIcon from "react-native-vector-icons/Octicons";
import AntIcon from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FriendItem from "./FriendItem";
import axios from "axios";
import { API } from "../../../utils/api";
import Menus from "../../../components/Menus/Menus";

export interface userInterface {
  fname: string;
  lname: string;
  status: number;
  user_category: string;
  user_category_id: number;
  user_id: number;
  username: string;
}

interface FriendsProps {
  users: userInterface[];
  loading: boolean;
  logout: () => void;
  setSelectedUser: (user: userInterface) => void;
}
const Friends = (props: FriendsProps) => {
  const [displaySearch, setDisplaySearch] = useState<boolean>(false);
  const [displayMenus, setDisplayMenus] = useState<boolean>(false);
  return (
    <View>
      {displayMenus === true && (
        <Menus
          menus={[
            {
              title: "Profile",
              action: () => alert("Profile"),
            },
            {
              title: "Logout",
              action: () => props.logout(),
            },
          ]}
          onClose={() => setDisplayMenus(false)}
        />
      )}
      <View style={tw`bg-blue-700 px-5 py-4 pt-16`}>
        <View style={tw`flex flex-row items-center justify-between`}>
          <View style={tw`flex flex-row items-center`}>
            <View style={tw`mr-4`}>
              <EntypoIcon name="users" size={35} color="#abbeff" />
            </View>
            <View>
              <Text style={tw`text-white text-2xl font-bold`}>Friends</Text>
              {/* <Text style={tw`text-blue-300 -mt-1`}>
                Choose a friend to chat with
              </Text> */}
            </View>
          </View>
          <View style={tw`flex flex-row items-center`}>
            <TouchableOpacity
              style={tw`flex flex-row items-center`}
              onPress={() => setDisplaySearch(!displaySearch)}
            >
              <AntIcon name="search1" size={30} color="#abbeff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDisplayMenus(true)}
              style={tw`bg-blue-600 p-2 rounded-full ml-3 -mr-3`}
            >
              <MaterialIcon name="more-vert" size={30} color="#abbeff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {displaySearch === true && (
        <View>
          <TextInput
            style={tw`px-6 pb-1 text-base flex flex-col justify-center h-12 border border-gray-200`}
            value={""}
            onChangeText={() => alert("")}
            placeholder={"Search by names"}
            returnKeyType="next"
          />
        </View>
      )}
      <ScrollView style={[tw`bg-gray-100`, { height: "80%" }]}>
        {props.loading === true ? (
          <Text style={tw`text-2xl text-gray-500 text-center mt-10`}>
            Loading, Please wait...
          </Text>
        ) : (
          props.users.map((item, i) => (
            <FriendItem
              key={i + 1}
              user={item}
              messages={0}
              onPress={(user: userInterface) => props.setSelectedUser(user)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Friends;
