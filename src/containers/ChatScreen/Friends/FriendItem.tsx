import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontIcon from "react-native-vector-icons/FontAwesome";
import { userInterface } from "./Friends";

interface FriendItemProps {
  user: userInterface;
  messages: number;
  onPress: (user: userInterface) => void;
}

const FriendItem = (props: FriendItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.user)}
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
            {props.messages}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FriendItem;
