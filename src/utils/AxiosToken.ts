import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const APP_TOKEN_NAME = "chat_app_token_name_jlshfjsd";

export const setAxiosToken = async () => {
  if (await AsyncStorage.getItem(APP_TOKEN_NAME)) {
    try {
      const res = await AsyncStorage.getItem(APP_TOKEN_NAME);
      if (res !== null) {
        axios.defaults.headers.common["x-auth-token"] = res;
      } else {
        delete axios.defaults.headers.common["x-auth-token"];
      }
    } catch (error) {
      delete axios.defaults.headers.common["x-auth-token"];
    }
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export const AxiosConfig = () => {};
