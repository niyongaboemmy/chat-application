import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontIcon from "react-native-vector-icons/FontAwesome";
import { userInterface } from "./Friends";
import io from "socket.io-client";
import { connect } from "react-redux";
import { StoreState } from "../../../reducers";
import { Auth, RunWithAuthentication } from "../../../actions/auth";
import {
  FC_Login,
  FC_CheckLoggedIn,
  Socket,
  setNewConnection,
} from "../../../actions";
import { SOCKET_API } from "../../../utils/api";
import { UserChats } from "../ChatScreen";
import uuid from "react-native-uuid";

interface FriendItemProps {
  user: userInterface;
  messages: number;
  auth: Auth;
  socket: Socket;
  onPress: (user: userInterface) => void;
  userChats: UserChats[];
  getUserChats: (headers: any) => void;
}

const _FriendItem = (props: FriendItemProps) => {
  const default_uuid: string = uuid.v4().toString();
  let UserChatGroup = props.userChats.find(
    (itm) =>
      props.user !== null &&
      props.auth.user !== null &&
      ((itm.sender_id.user_id === parseInt(props.auth.user.user_id) &&
        itm.receiver_id.user_id === props.user.user_id) ||
        (itm.receiver_id.user_id === parseInt(props.auth.user.user_id) &&
          itm.sender_id.user_id === props.user.user_id))
  );
  const joinChatRoom = (
    username: string,
    UserChatGroup: UserChats | undefined
  ) => {
    let chatRoomId =
      UserChatGroup !== undefined ? UserChatGroup.chat_id : default_uuid;
    props.socket.socket.emit("joinRoom", { username, chatRoomId });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress(props.user);
        props.user &&
          joinChatRoom(props.user.user_id.toString(), UserChatGroup);
        RunWithAuthentication(props.getUserChats);
      }}
      style={tw`bg-white border-b border-gray-100 py-2`}
    >
      <View style={tw`flex flex-row items-center justify-between`}>
        <View style={tw`flex flex-row items-center px-4`}>
          <FontIcon name="user-circle" size={40} color="#d1d1d1" />
          <View>
            <Text style={tw`text-lg font-bold ml-3 text-gray-700`}>
              {props.user.username}
            </Text>
            <Text style={tw`ml-3 text-gray-700`}>
              {props.user.fname} {props.user.lname}
            </Text>
          </View>
        </View>
        <View style={tw`mr-5 bg-blue-600 px-2 py-1 rounded-full`}>
          <Text style={tw`text-xs text-center text-white`}>
            {props.userChats.find(
              (itm) =>
                props.auth.user !== null &&
                props.user !== null &&
                ((itm.sender_id.user_id === parseInt(props.auth.user.user_id) &&
                  itm.receiver_id.user_id === props.user.user_id) ||
                  (itm.receiver_id.user_id ===
                    parseInt(props.auth.user.user_id) &&
                    itm.sender_id.user_id === props.user.user_id))
            ) === undefined
              ? 0
              : props.userChats.find(
                  (itm) =>
                    props.auth.user !== null &&
                    props.user !== null &&
                    ((itm.sender_id.user_id ===
                      parseInt(props.auth.user.user_id) &&
                      itm.receiver_id.user_id === props.user.user_id) ||
                      (itm.receiver_id.user_id ===
                        parseInt(props.auth.user.user_id) &&
                        itm.sender_id.user_id === props.user.user_id))
                )!.userChatText.length}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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

const FriendItem = connect(mapStateToProps, {
  FC_Login,
  FC_CheckLoggedIn,
  setNewConnection,
})(_FriendItem);

export default FriendItem;
