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
import { Auth } from "../../actions/auth";
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

interface ChatScreenProps {
  auth: Auth;
  FC_Logout: () => void;
}
interface ChatScreenState {
  loading: boolean;
  selectedChat: string;
  selectedUser: userInterface | null;
  users: userInterface[];
}

export class _ChatScreen extends Component<ChatScreenProps, ChatScreenState> {
  constructor(props: ChatScreenProps) {
    super(props);

    this.state = {
      loading: false,
      selectedChat: "5",
      selectedUser: null,
      users: [],
    };
  }
  getUsers = async () => {
    if (this.props.auth.user !== null) {
      try {
        this.setState({ loading: true });
        setAxiosToken();
        const res = await axios.get<userInterface[]>(`${API}/users`);
        // this.setState({
        //   users: res.data.filter(
        //     (itm) =>
        //       this.props.auth.user !== null &&
        //       itm.user_id !== parseInt(this.props.auth.user.user_id)
        //   ),
        // });
        this.setState({
          users: res.data,
        });
        this.setState({ loading: false });
        console.log("Users: ", res.data);
      } catch (error: any) {
        this.setState({ loading: false });
        console.log("Err users: ", { ...error });
      }
    }
  };
  setSelectedUser = (user: userInterface | null) => {
    this.setState({ selectedUser: user });
  };
  componentDidMount = () => {
    this.getUsers();
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
