import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { Auth, RunWithAuthentication } from "../../actions/auth";
import { FC_Login, FC_Logout } from "../../actions";
import tw from "tailwind-react-native-classnames";
import ButtonItem, { ButtonThemes } from "../../components/styles/ButtonItem";
import Alert, { AlertThemes } from "../../components/Alert/Alert";
import Friends, { userInterface } from "./Friends/Friends";
import ChatPage from "./ChatPage/ChatPage";
import axios from "axios";
import { API } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_TOKEN_NAME, setAxiosToken } from "../../utils/AxiosToken";
import { UserCategoryInterface } from "../RegisterScreen/RegisterScreen";

export interface UserChats {
  chat_id: string;
  date_created: string;
  receiver_id: userInterface;
  sender_id: userInterface;
  status: number;
  userChatText: {
    chat_id: string;
    date_sent: string;
    sender: number;
    receiver: number;
    status: number;
    text_chat_id: number;
    text_message: string;
  }[];
}

export interface ChatMessageInterface {
  chat_id: string; //none | chat id
  sender_id: number;
  receiver_id: number;
  message: string;
}

interface ChatScreenProps {
  auth: Auth;
  FC_Logout: () => void;
}
interface ChatScreenState {
  loading: boolean;
  selectedChat: string;
  selectedUser: userInterface | null;
  users: userInterface[];
  userChats: UserChats[];
  authToken: string | null;
}

export class _ChatScreen extends Component<ChatScreenProps, ChatScreenState> {
  constructor(props: ChatScreenProps) {
    super(props);

    this.state = {
      loading: false,
      selectedChat: "5",
      selectedUser: null,
      users: [],
      userChats: [],
      authToken: null,
    };
  }

  getUsers = async (headers: any) => {
    if (this.props.auth.user !== null) {
      try {
        this.setState({ loading: true });
        setAxiosToken();
        const res = await axios.get<userInterface[]>(`${API}/users`, headers);
        this.setState({
          users: res.data.filter(
            (itm) =>
              this.props.auth.user !== null &&
              itm.user_id !== parseInt(this.props.auth.user.user_id)
          ),
        });
        this.setState({ loading: false });
        console.log("Users: ", res.data);
      } catch (error: any) {
        this.setState({ loading: false });
        console.log("Err users: ", { ...error });
      }
    }
  };
  getUserChats = async (headers: any) => {
    if (this.props.auth.user !== null) {
      console.log("Chats headers: ", headers);
      try {
        this.setState({ loading: true });
        setAxiosToken();
        const res = await axios.get<UserChats[]>(
          `${API}/chats/userchats/${this.props.auth.user.user_id}`,
          headers
        );
        this.setState({
          userChats: res.data,
        });
        this.setState({ loading: false });
        console.log("Users chats: ", res.data);
      } catch (error: any) {
        this.setState({ loading: false });
        console.log("Err get chats: ", { ...error });
      }
    }
  };

  sendChatMessage = async (chatMessage: ChatMessageInterface) => {
    if (this.props.auth.user !== null) {
      try {
        this.setState({ loading: true });
        setAxiosToken();
        const res = await axios.post(`${API}/chats`, chatMessage);
        RunWithAuthentication(this.getUserChats);
        alert("Message sent!");
        this.setState({ loading: false });
        console.log("Sent msg: ", res.data);
      } catch (error: any) {
        this.setState({ loading: false });
        console.log("Err send msg: ", { ...error });
      }
    }
  };

  setSelectedUser = (user: userInterface | null) => {
    this.setState({ selectedUser: user });
  };
  componentDidMount = () => {
    RunWithAuthentication(this.getUsers);
    RunWithAuthentication(this.getUserChats);
  };
  render() {
    return (
      <View>
        <StatusBar
          animated={true}
          backgroundColor="#fff"
          barStyle="light-content"
          showHideTransition="fade"
          hidden={false}
        />
        {this.state.selectedUser === null ? (
          <Friends
            users={this.state.users}
            loading={this.state.loading}
            logout={this.props.FC_Logout}
            setSelectedUser={this.setSelectedUser}
          />
        ) : (
          <ChatPage
            user={this.props.auth.user}
            userChats={this.state.userChats}
            sendChatMessage={this.sendChatMessage}
            selectedUser={this.state.selectedUser}
            setSelectedUser={this.setSelectedUser}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({
  auth,
}: StoreState): {
  auth: Auth;
} => {
  return {
    auth: auth,
  };
};

export const ChatScreen = connect(mapStateToProps, { FC_Login, FC_Logout })(
  _ChatScreen
);
