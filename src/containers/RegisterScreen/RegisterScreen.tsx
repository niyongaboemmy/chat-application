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
  StatusBar,
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
import { errorToText } from "../../utils/errors";
import uuid from "react-native-uuid";

export enum UserCategoryInterface {
  Normal = 2,
  Admin = 1,
}

interface RegisterScreenContentProps {
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
interface RegisterScreenContentState {
  loading: boolean;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  confirm_password: string;
  formError: {
    element: string;
    msg: string;
  } | null;
}

export class _RegisterScreenContent extends Component<
  RegisterScreenContentProps,
  RegisterScreenContentState
> {
  constructor(props: RegisterScreenContentProps) {
    super(props);

    this.state = {
      loading: false,
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      confirm_password: "",
      formError: null,
    };
    this.Register = this.Register.bind(this);
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
  setFirstName = (first_name: string) => {
    this.setState({ first_name: first_name });
  };
  setLastName = (last_name: string) => {
    this.setState({ last_name: last_name });
  };
  setUsername = (username: string) => {
    this.setState({ username: username });
  };
  setPassword = (password: string) => {
    this.setState({ password: password });
  };
  setConfirmPassword = (confirm_password: string) => {
    this.setState({ confirm_password: confirm_password });
  };

  Register = async () => {
    if (this.state.first_name === "") {
      return this.setState({
        formError: {
          element: "first_name",
          msg: "Please fill first name",
        },
      });
    }
    if (this.state.last_name === "") {
      return this.setState({
        formError: {
          element: "last_name",
          msg: "Please fill last name",
        },
      });
    }
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
    if (this.state.confirm_password === "") {
      return this.setState({
        formError: {
          element: "confirm_password",
          msg: "Please confirm password",
        },
      });
    }
    if (this.state.confirm_password !== this.state.password) {
      return this.setState({
        formError: {
          element: "confirm_password",
          msg: "Password does not match!",
        },
      });
    }
    let data = {
      user_category_id: UserCategoryInterface.Normal,
      fname: this.state.first_name,
      lname: this.state.last_name,
      username: this.state.username,
      password: this.state.password,
    };
    // Register function
    this.setState({ loading: true });
    console.log("Sent data: ", data);
    try {
      const res = await axios.post(`${API}/users`, data);
      if (res.status === 200) {
        console.log("Registered successfully!", res.status);
        this.props.navigation.navigate("Login", {
          action: "",
          redirectedPage: "",
        });
      }
      this.setState({ loading: false });
    } catch (error: any) {
      this.setState({ loading: false });
      alert(errorToText(error));
      console.log("Err: ", { ...error });
    }
  };
  render() {
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={tw`h-full bg-white pb-10`}>
          <StatusBar
            animated={true}
            backgroundColor="#fff"
            barStyle="dark-content"
            showHideTransition="fade"
            hidden={false}
          />
          <ScrollView>
            <PublicHeader />
            <View style={tw`px-4`}>
              <View
                style={tw`flex flex-row items-center justify-center mt-5 mb-2`}
              >
                <Text style={tw`font-extrabold text-3xl`}>Sign up to chat</Text>
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
                    First name
                  </Text>
                  <InputText
                    value={this.state.first_name}
                    placeholder="Fill first name"
                    secureTextEntry={false}
                    onChange={this.setFirstName}
                  />
                  {this.state.formError !== null &&
                    this.state.formError.element === "first_name" && (
                      <Text style={tw`text-sm font-bold text-red-600 -mt-2`}>
                        {this.state.formError.msg}
                      </Text>
                    )}
                </View>
                <View>
                  <Text style={tw`text-base font-bold text-gray-600`}>
                    Last name
                  </Text>
                  <InputText
                    value={this.state.last_name}
                    placeholder="Fill Last name"
                    secureTextEntry={false}
                    onChange={this.setLastName}
                  />
                  {this.state.formError !== null &&
                    this.state.formError.element === "last_name" && (
                      <Text style={tw`text-sm font-bold text-red-600 -mt-2`}>
                        {this.state.formError.msg}
                      </Text>
                    )}
                </View>
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
                <View style={tw`my-4`}>
                  <Text style={tw`text-base font-bold text-gray-600`}>
                    Confirm Password
                  </Text>
                  <InputText
                    value={this.state.confirm_password}
                    placeholder="Fill confirm password"
                    secureTextEntry={true}
                    onChange={this.setConfirmPassword}
                  />
                  {this.state.formError !== null &&
                    this.state.formError.element === "confirm_password" && (
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
                  <Text>Creating account, Please wait...</Text>
                ) : (
                  <>
                    <ButtonItem
                      onPress={() => {
                        this.Register();
                      }}
                      title="Sign up"
                      theme={ButtonThemes.Primary}
                      style="mb-3 w-full"
                    />
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Login", {
                          action: "",
                          redirectedPage: "",
                        })
                      }
                      style={tw`mt-3 mb-40`}
                    >
                      <Text
                        style={tw`text-lg font-bold text-gray-600 underline`}
                      >
                        Click to sign in
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

export const RegisterScreenContent = connect(mapStateToProps, { FC_Login })(
  _RegisterScreenContent
);

export const RegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
  const route = useRoute<RouteProp<RouteParams>>();
  return <RegisterScreenContent navigation={navigation} route={route} />;
};

export default RegisterScreen;
