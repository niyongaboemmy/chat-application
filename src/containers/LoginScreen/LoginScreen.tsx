import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { Component } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { RouteParams } from "../../components/Navigation/RootNavigator";
import PublicHeader from "../../components/PublicHeader/PublicHeader";
import ButtonItem, { ButtonThemes } from "../../components/styles/ButtonItem";
import InputText from "../../components/styles/InputText";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { Auth, UserLoginDetails } from "../../actions/auth";
import { FC_Login } from "../../actions";
import axios from "axios";
import { API } from "../../utils/api";

interface LoginScreenContentProps {
  navigation: NativeStackNavigationProp<RouteParams>;
  route: RouteProp<RouteParams, keyof RouteParams>;
  auth: Auth;
  FC_Login: (
    data: {
      username: string;
      password: string;
    },
    callback: (
      status: boolean,
      feedback: {
        status: boolean;
        msg: string;
      }
    ) => void
  ) => void;
}
interface LoginScreenContentState {
  loading: boolean;
  username: string;
  password: string;
  formError: {
    element: string;
    msg: string;
  } | null;
}

export class _LoginScreenContent extends Component<
  LoginScreenContentProps,
  LoginScreenContentState
> {
  constructor(props: LoginScreenContentProps) {
    super(props);

    this.state = {
      loading: false,
      username: "",
      password: "",
      formError: null,
    };
    this.Login = this.Login.bind(this);
  }
  setLoading = (
    state: boolean,
    feedback: {
      status: boolean;
      msg: string;
    }
  ) => {
    this.setState({ loading: state });
    state === false && alert("Message: " + feedback.msg);
  };
  setUsername = (username: string) => {
    this.setState({ username: username });
  };
  setPassword = (password: string) => {
    this.setState({ password: password });
  };

  Login = async () => {
    if (this.state.username === "") {
      return this.setState({
        formError: {
          element: "username",
          msg: "Please fill email or password",
        },
      });
    }
    if (this.state.password === "") {
      return this.setState({
        formError: {
          element: "password",
          msg: "Please fill password",
        },
      });
    }
    let data = {
      username: this.state.username,
      password: this.state.password,
    };
    // Login function
    this.props.FC_Login(data, this.setLoading);
  };
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated === true) {
      this.props.navigation.navigate("ChatPage");
    }
  };
  render() {
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={tw`h-full bg-white`}>
          <ScrollView>
            <PublicHeader />
            <View style={tw`px-4`}>
              <View
                style={tw`flex flex-row items-center justify-center mt-5 mb-2`}
              >
                <Text style={tw`font-extrabold text-3xl`}>Sign in to chat</Text>
              </View>
              <View style={tw`flex flex-row items-center justify-center mb-10`}>
                <Text style={tw`text-base text-center`}>
                  Provide your credentials to enjoy secure chat system with
                  encryption technology
                </Text>
              </View>
              <View style={tw`flex flex-col mt-5`}>
                <View>
                  <Text style={tw`text-base font-bold text-gray-600`}>
                    Username
                  </Text>
                  <InputText
                    value={this.state.username}
                    placeholder="Fill username"
                    secureTextEntry={false}
                    onChange={this.setUsername}
                  />
                  {this.state.formError !== null &&
                    this.state.formError.element === "username" && (
                      <Text style={tw`text-sm font-bold text-red-600 -mt-2`}>
                        {this.state.formError.msg}
                      </Text>
                    )}
                </View>
                <View style={tw`my-4`}>
                  <Text style={tw`text-base font-bold text-gray-600`}>
                    Password
                  </Text>
                  <InputText
                    value={this.state.password}
                    placeholder="Fill password"
                    secureTextEntry={true}
                    onChange={this.setPassword}
                  />
                  {this.state.formError !== null &&
                    this.state.formError.element === "password" && (
                      <Text style={tw`text-sm font-bold text-red-600 -mt-2`}>
                        {this.state.formError.msg}
                      </Text>
                    )}
                </View>
              </View>
              <View
                style={tw`flex flex-col items-center justify-center w-full`}
              >
                {this.state.loading === true ? (
                  <Text>Logging in, Please wait...</Text>
                ) : (
                  <>
                    <ButtonItem
                      onPress={() => {
                        this.Login();
                      }}
                      title="Sign in"
                      theme={ButtonThemes.Primary}
                      style="mb-3 w-full"
                    />
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Register")}
                      style={tw`mt-3`}
                    >
                      <Text
                        style={tw`text-lg font-bold text-gray-600 underline`}
                      >
                        Click to sign up
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
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

export const LoginScreenContent = connect(mapStateToProps, { FC_Login })(
  _LoginScreenContent
);

export const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
  const route = useRoute<RouteProp<RouteParams>>();
  return <LoginScreenContent navigation={navigation} route={route} />;
};

export default LoginScreen;
