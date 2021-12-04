import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontIcon from "react-native-vector-icons/FontAwesome5";
import {
  RunWithAuthentication,
  UserDetails,
  UserLoginDetails,
} from "../../../actions/auth";
import { ChatMessageInterface, UserChats } from "../ChatScreen";
import { connect } from "react-redux";
import { StoreState } from "../../../reducers";
import { Auth } from "../../../actions/auth";
import uuid from "react-native-uuid";
import {
  FC_Login,
  FC_CheckLoggedIn,
  Socket,
  setNewConnection,
} from "../../../actions";
import { API, SOCKET_API } from "../../../utils/api";
import { decrypt_message, encrypt_message } from "../../../utils/encrypt";
import axios from "axios";
import { errorToText } from "../../../utils/errors";
import InputText from "../../../components/styles/InputText";
import ButtonItem, {
  ButtonThemes,
} from "../../../components/styles/ButtonItem";

export interface userInterface {
  fname: string;
  lname: string;
  status: number;
  user_category: string;
  user_category_id: number;
  user_id: number;
  username: string;
}

export interface SocketMessage {
  username: string;
  text: {
    sender: number;
    receiver: number;
    message: string;
  };
}

interface ChatPageProps {
  user: UserDetails | null;
  selectedUser: userInterface;
  userChats: UserChats[];
  setSelectedUser: (user: userInterface | null) => void;
  sendChatMessage: (chatMessage: ChatMessageInterface) => void;
  auth: Auth;
  socket: Socket;
  getUserChats: (headers: any) => void;
}
const _ChatPage = (props: ChatPageProps) => {
  const [chatMessage, setChatMessage] = useState<string>("");
  const [encrypted, setEncrypted] = useState<boolean>(false);
  let default_uuid: string = uuid.v4().toString();
  const [myChats, setMyChats] = useState<UserChats[]>(props.userChats);
  const [loading, setLoading] = useState<boolean>(false);
  const [encryptPassword, setEncryptPassword] = useState<string>("");
  const [showEncryptPassword, setShowEncryptPassword] =
    useState<boolean>(false);

  const confirmEncryption = async (status: boolean, password: string) => {
    if (props.auth.user !== null && password !== "" && password !== null) {
      let data = {
        username: props.auth.user.username,
        password: password,
      };
      setLoading(true);
      try {
        const res = await axios.post<UserLoginDetails>(
          `${API}/auth/login`,
          data
        );
        setEncrypted(!status);
        setLoading(false);
        setShowEncryptPassword(false);
        setEncryptPassword("");
      } catch (error: any) {
        setLoading(false);
        setShowEncryptPassword(false);
        setEncryptPassword("");
        if (error.response !== undefined) {
          alert(error.response.data.msg);
        } else {
          alert("Error occurred, Please try again");
        }
      }
    }
  };
  let UserChatGroup = myChats.find(
    (itm) =>
      props.user !== null &&
      ((itm.sender_id.user_id === parseInt(props.user.user_id) &&
        itm.receiver_id.user_id === props.selectedUser.user_id) ||
        (itm.receiver_id.user_id === parseInt(props.user.user_id) &&
          itm.sender_id.user_id === props.selectedUser.user_id))
  );
  const getMessages = (UserChatGroup: UserChats | undefined) => {
    props.socket.socket.on("message", (message: SocketMessage | "Welcome") => {
      console.log("Get messages: ", message);
      props.user &&
        message !== "Welcome" &&
        setMyChats([
          ...(UserChatGroup === undefined
            ? myChats
            : myChats.filter((itm) => itm.chat_id !== UserChatGroup.chat_id)),
          {
            chat_id:
              UserChatGroup === undefined
                ? default_uuid
                : UserChatGroup.chat_id,
            date_created:
              UserChatGroup === undefined
                ? new Date().toString()
                : UserChatGroup.date_created,
            receiver_id:
              UserChatGroup !== undefined
                ? message.text.sender === UserChatGroup.receiver_id.user_id
                  ? UserChatGroup.receiver_id
                  : UserChatGroup.sender_id
                : {
                    fname: props.selectedUser.fname,
                    lname: props.selectedUser.lname,
                    status: props.selectedUser.status,
                    user_category: props.selectedUser.user_category,
                    user_category_id: props.selectedUser.user_category_id,
                    user_id: props.selectedUser.user_id,
                    username: props.selectedUser.username,
                  },
            sender_id:
              UserChatGroup !== undefined
                ? message.text.receiver === UserChatGroup.sender_id.user_id
                  ? UserChatGroup.sender_id
                  : UserChatGroup.receiver_id
                : {
                    fname: props.user.fname,
                    lname: props.user.lname,
                    status: props.user.status,
                    user_category: props.user.user_category,
                    user_category_id: props.user.user_category_id,
                    user_id: parseInt(props.user.user_id),
                    username: props.user.username,
                  },
            status: UserChatGroup === undefined ? 1 : UserChatGroup.status,
            userChatText: [
              ...(UserChatGroup === undefined
                ? []
                : UserChatGroup.userChatText),
              {
                chat_id:
                  UserChatGroup === undefined
                    ? default_uuid
                    : UserChatGroup.chat_id,
                date_sent: new Date().toString(),
                receiver: message.text.receiver,
                sender: message.text.sender,
                status: 1,
                text_chat_id:
                  UserChatGroup !== undefined
                    ? UserChatGroup.userChatText.length + 1
                    : 1,
                text_message: message.text.message,
              },
            ],
          },
        ]);
    });
  };
  const getTime = (thisDateTime: string) => {
    let tempTime = new Date(thisDateTime);
    return `${tempTime.getHours()}:${tempTime.getMinutes()}:${tempTime.getSeconds()}`;
  };
  const sendMessage = () => {
    if (props.user !== null && chatMessage !== null && chatMessage !== "") {
      console.log("Mess: ", encrypt_message(chatMessage));
      sendSocketMessage({
        username: props.user.user_id,
        text: {
          sender: parseInt(props.user.user_id),
          receiver: props.selectedUser.user_id,
          message: encrypt_message(chatMessage),
        },
      });
      getMessages(UserChatGroup);
      let obj: ChatMessageInterface = {
        chat_id:
          UserChatGroup === undefined ? default_uuid : UserChatGroup.chat_id,
        sender_id: parseInt(props.user.user_id),
        receiver_id: props.selectedUser.user_id,
        message: encrypt_message(chatMessage),
      };
      console.log("OBJ: ", obj);
      props.sendChatMessage(obj);
      if (UserChatGroup === undefined) {
        RunWithAuthentication(props.getUserChats);
      }
      default_uuid = uuid.v4().toString();
    }
  };

  const sendSocketMessage = (message: SocketMessage) => {
    props.socket.socket.emit("message", message);
    console.log("msg: ", message);
  };

  useEffect(() => {
    getMessages(UserChatGroup);
  });
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
            onPress={() => setShowEncryptPassword(!showEncryptPassword)}
          >
            {encrypted === true ? (
              <MaterialIcon name="no-encryption" size={30} color="#abbeff" />
            ) : (
              <MaterialIcon
                name="enhanced-encryption"
                size={30}
                color="#abbeff"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {showEncryptPassword === true && (
        <View style={tw`px-3 py-3`}>
          <View
            style={tw`bg-white flex flex-col items-end justify-end w-full p-3 border-2 border-blue-600 rounded shadow-xl`}
          >
            <InputText
              value={encryptPassword}
              placeholder={"Enter password"}
              secureTextEntry={true}
              keyboardType={"default"}
              onChange={setEncryptPassword}
            />
            <View>
              <TouchableOpacity
                style={tw`w-full ${
                  encryptPassword !== "" ? "bg-blue-600" : "bg-yellow-600"
                } px-4 py-2 rounded`}
                onPress={() => confirmEncryption(encrypted, encryptPassword)}
              >
                <Text style={tw`text-lg font-bold text-white`}>
                  {encryptPassword !== "" ? "Done" : "Cancel"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
                        {encrypted === true
                          ? decrypt_message(item.text_message)
                          : item.text_message}
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
                        {encrypted === true
                          ? decrypt_message(item.text_message)
                          : item.text_message}
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

const mapStateToProps = ({
  auth,
  socket,
}: StoreState): {
  auth: Auth;
  socket: Socket;
} => {
  return {
    auth: auth,
    socket: socket,
  };
};

const ChatPage = connect(mapStateToProps, {
  FC_Login,
  FC_CheckLoggedIn,
  setNewConnection,
})(_ChatPage);

export default ChatPage;
