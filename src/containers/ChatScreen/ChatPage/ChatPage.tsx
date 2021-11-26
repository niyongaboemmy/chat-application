import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import OctIcon from "react-native-vector-icons/Octicons";
import FontIcon from "react-native-vector-icons/FontAwesome5";
import AntIcon from "react-native-vector-icons/AntDesign";
import axios from "axios";
import { API } from "../../../utils/api";
import { UserDetails } from "../../../actions/auth";

export interface userInterface {
  fname: string;
  lname: string;
  status: number;
  user_category: string;
  user_category_id: number;
  user_id: number;
  username: string;
}

interface ChatPageProps {
  user: UserDetails | null;
  selectedUser: userInterface;
  setSelectedUser: (user: userInterface | null) => void;
}
const ChatPage = (props: ChatPageProps) => {
  const [displaySearch, setDisplaySearch] = useState<boolean>(false);
  const [userChats, setUserChats] = useState<any>(null);
  const getUserChats = async (user_id: string) => {
    try {
      const res = await axios.get(`${API}/chats/userchats/${user_id}`);
      setUserChats(res.data);
      console.log("Chats: ", res.data);
    } catch (error: any) {
      console.log("Chats err: ", { ...error });
    }
  };
  useEffect(() => {
    if (props.user !== null && userChats === null) {
      getUserChats(props.user.user_id);
    }
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`h-full`}
    >
      <View style={tw`bg-blue-700 px-5 pl-0 py-2 pt-12`}>
        <View style={tw`flex flex-row items-center justify-between`}>
          <View style={tw`flex flex-row items-center`}>
            <TouchableOpacity
              onPress={() => props.setSelectedUser(null)}
              style={tw`flex flex-row pr-3 py-5 pl-5`}
            >
              <FontIcon name="arrow-left" size={30} color="#d1d1d1" />
            </TouchableOpacity>
            {/* <FontIcon name="user-alt" size={30} color="#d1d1d1" /> */}
            <View style={tw`ml-2`}>
              <Text style={tw`text-white text-2xl font-bold`}>
                {props.selectedUser.username}
              </Text>
              <Text style={tw`text-blue-300 -mt-1`}>
                {props.selectedUser.fname} {props.selectedUser.lname}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[tw`bg-blue-50 h-full px-4 py-4`, { flex: 1 }]}>
        <View style={tw`mb-3`}>
          <View style={tw`flex flex-col items-start`}>
            {/* <FontIcon name="user-circle" size={30} color="#000" /> */}
            <View style={tw`bg-blue-200 px-3 py-1 rounded-r-xl rounded-t-xl`}>
              <Text style={tw`text-base font-bold text-gray-800`}>
                Hello Emma
              </Text>
            </View>
            <Text style={tw`text-gray-500 font-semibold ml-2 mt-1`}>
              11:44 am
            </Text>
          </View>
        </View>
        <View style={tw`mb-3 flex items-end`}>
          <View style={tw`flex flex-col items-end`}>
            <View style={tw`bg-blue-600 px-3 py-1 rounded-l-xl rounded-t-xl`}>
              <Text style={tw`text-base font-bold text-white`}>Hello Emma</Text>
            </View>
            <Text style={tw`text-gray-600 font-semibold mr-2 mt-1`}>
              11:44 am
            </Text>
            {/* <FontIcon name="user-alt" size={30} color="#0c57ff" /> */}
          </View>
        </View>
        <View style={tw`mb-3 flex items-end`}>
          <View style={tw`flex flex-col items-end`}>
            <View style={tw`bg-blue-600 px-3 py-1 rounded-l-xl rounded-t-xl`}>
              <Text style={tw`text-base font-bold text-white`}>Hello Emma</Text>
            </View>
            <Text style={tw`text-gray-600 font-semibold mr-2 mt-1`}>
              11:44 am
            </Text>
            {/* <FontIcon name="user-alt" size={30} color="#0c57ff" /> */}
          </View>
        </View>
      </View>
      <View
        style={tw`bg-gray-200 px-2 py-2 flex flex-row items-center justify-between pb-4`}
      >
        <TextInput
          multiline={true}
          style={[
            tw`border border-gray-300 rounded-full px-4 py-4 h-12 bg-white ml-3`,
            { width: "80%" },
          ]}
        />
        <View style={tw`bg-blue-600 px-2 py-2 rounded-full`}>
          <FontIcon name="paper-plane" size={26} color="#fff" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatPage;
