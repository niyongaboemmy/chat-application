import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontIcon from "react-native-vector-icons/FontAwesome5";
import { UserDetails } from "../../../actions/auth";
import { ChatMessageInterface, UserChats } from "../ChatScreen";

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
  userChats: UserChats[];
  setSelectedUser: (user: userInterface | null) => void;
  sendChatMessage: (chatMessage: ChatMessageInterface) => void;
}
const ChatPage = (props: ChatPageProps) => {
  const [chatMessage, setChatMessage] = useState<string>("");
  let UserChatGroup = props.userChats.find(
    (itm) =>
      props.user !== null &&
      ((itm.sender_id.user_id === parseInt(props.user.user_id) &&
        itm.receiver_id.user_id === props.selectedUser.user_id) ||
        (itm.receiver_id.user_id === parseInt(props.user.user_id) &&
          itm.sender_id.user_id === props.selectedUser.user_id))
  );
  const getTime = (thisDateTime: string) => {
    let tempTime = new Date(thisDateTime);
    return `${tempTime.getHours()}:${tempTime.getMinutes()}:${tempTime.getSeconds()}`;
  };
  const sendMessage = () => {
    if (props.user !== null) {
      let obj: ChatMessageInterface = {
        chat_id: UserChatGroup === undefined ? "none" : UserChatGroup.chat_id,
        sender_id: parseInt(props.user.user_id),
        receiver_id: props.selectedUser.user_id,
        message: chatMessage,
      };
      console.log("OBJ: ", obj);
      props.sendChatMessage(obj);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`h-full bg-white pb-10`}
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
          <TouchableOpacity
            style={tw`bg-blue-500 rounded-full p-2`}
            onPress={() => alert("Encrypted")}
          >
            <MaterialIcon name="no-encryption" size={30} color="#abbeff" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        keyboardDismissMode="on-drag"
        style={[tw`bg-white h-full px-4 py-4`, { flex: 1 }]}
      >
        {UserChatGroup === undefined ? (
          <Text style={tw``}>No messages yet</Text>
        ) : UserChatGroup.userChatText.length === 0 ? (
          <Text style={tw``}>No messages yet</Text>
        ) : (
          props.user !== null &&
          UserChatGroup.userChatText.map((item, i) => (
            <View key={i + 1}>
              {item.receiver === parseInt(props.user!.user_id) && (
                <View style={tw`mb-3 mr-16`}>
                  <View style={tw`flex flex-col items-start`}>
                    {/* <FontIcon name="user-circle" size={30} color="#000" /> */}
                    <View
                      style={tw`bg-blue-200 px-3 py-1 rounded-r-xl rounded-t-xl`}
                    >
                      <Text style={tw`text-base font-bold text-gray-800`}>
                        {item.text_message}
                      </Text>
                    </View>
                    <Text style={tw`text-gray-500 font-semibold ml-2 mt-1`}>
                      {getTime(item.date_sent)}
                    </Text>
                  </View>
                </View>
              )}
              {item.sender === parseInt(props.user!.user_id) && (
                <View style={tw`mb-3 ml-16 flex items-end`}>
                  <View style={tw`flex flex-col items-end`}>
                    <View
                      style={tw`bg-blue-600 px-3 py-1 rounded-l-xl rounded-t-xl`}
                    >
                      <Text style={tw`text-base font-bold text-white`}>
                        {item.text_message}
                      </Text>
                    </View>
                    <Text style={tw`text-gray-600 font-semibold mr-2 mt-1`}>
                      {getTime(item.date_sent)}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
      <View
        style={tw`bg-gray-200 px-2 py-2 flex flex-row items-center justify-between pb-4`}
      >
        <TextInput
          multiline={true}
          style={[
            tw`border border-gray-300 rounded-full px-4 py-4 h-12 bg-white ml-3`,
            { width: "80%" },
          ]}
          onChangeText={setChatMessage}
          value={chatMessage}
        />
        <TouchableOpacity
          onPress={() => {
            if (chatMessage !== "" && chatMessage.length > 0) {
              sendMessage();
              setChatMessage("");
            } else {
              alert("Fill text");
            }
          }}
          style={tw`bg-blue-600 px-2 py-2 rounded-full`}
        >
          <FontIcon name="paper-plane" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatPage;
