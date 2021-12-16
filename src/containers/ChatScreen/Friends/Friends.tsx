import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import AntIcon from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FriendItem from "./FriendItem";
import axios from "axios";
import { API } from "../../../utils/api";
import Menus from "../../../components/Menus/Menus";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteParams } from "../../../components/Navigation/RootNavigator";
import { UserChats } from "../ChatScreen";
import { RunWithAuthentication } from "../../../actions/auth";
import searchData from "../../../shared/search";

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
  userChats: UserChats[];
  getUserChats: (headers: any) => void;
  UserChatGroup: Function;
  getUsers: (headers: any) => void;
}
const Friends = (props: FriendsProps) => {
  const [displaySearch, setDisplaySearch] = useState<boolean>(false);
  const [displayMenus, setDisplayMenus] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = useState("");

  const wait = (timeout: any) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    RunWithAuthentication(props.getUsers);
    RunWithAuthentication(props.getUserChats);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <View style={tw`bg-white h-full`}>
      {displayMenus === true && (
        <Menus
          menus={[
            {
              title: "Profile",
              action: () => {
                setDisplayMenus(false);
                navigation.navigate("Profile");
              },
            },
            {
              title: "Logout",
              action: () => props.logout(),
            },
          ]}
          onClose={() => setDisplayMenus(false)}
        />
      )}
      <View style={tw`bg-blue-700 px-5 py-4`}>
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
            value={search}
            onChangeText={setSearch}
            placeholder={"Search by names"}
            returnKeyType="next"
          />
        </View>
      )}
      <View style={tw`bg-white h-full`}>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={tw`bg-gray-100 h-full`}
        >
          {props.loading === true ? (
            <Text style={tw`text-xl text-yellow-700 text-center mt-10`}>
              Loading, Please wait...
            </Text>
          ) : searchData(props.users, search).length === 0 ? (
            <View style={tw`px-6 py-6`}>
              <Text style={tw`text-center text-yellow-800 text-lg font-bold`}>
                No result found
              </Text>
            </View>
          ) : (
            searchData(props.users, search).map((item, i) => (
              <FriendItem
                key={i + 1}
                user={item}
                messages={0}
                onPress={(user: userInterface) => props.setSelectedUser(user)}
                userChats={props.userChats}
                getUserChats={props.getUserChats}
                UserChatGroup={props.UserChatGroup}
              />
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Friends;
