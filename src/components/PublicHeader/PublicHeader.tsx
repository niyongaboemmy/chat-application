import React from "react";
import { View, Text, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import MdIcon from "react-native-vector-icons/MaterialIcons";

const PublicHeader = () => {
  return (
    <View style={tw`pr-5 pl-2 flex flex-row pt-5 justify-between`}>
      <Image
        style={{
          width: 80,
          height: 80,
          resizeMode: "contain",
        }}
        source={require("../../assets/Logo.png")}
      />
      {/* <Text style={tw`font-bold text-2xl mt-2`}>Chat App</Text> */}
      <MdIcon name="info-outline" size={30} color="gray" />
    </View>
  );
};

export default PublicHeader;
