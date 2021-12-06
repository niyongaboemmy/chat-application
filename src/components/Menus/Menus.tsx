import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import AntIcon from "react-native-vector-icons/AntDesign";

interface MenusProps {
  menus: { title: string; action: () => void }[];
  onClose?: () => void;
}

const Menus = ({ menus, onClose }: MenusProps) => {
  return (
    <View style={tw`bg-blue-800 pt-4 absolute top-16 right-0 z-50 shadow-lg`}>
      <View
        style={tw`flex flex-row items-center justify-between border-b border-blue-800 pb-4 px-4`}
      >
        <Text style={tw`text-white font-bold text-lg mr-20`}>Menus</Text>
        <TouchableOpacity onPress={onClose}>
          <AntIcon name="close" size={30} color="#abbeff" />
        </TouchableOpacity>
      </View>
      {menus.map((item, i) => (
        <TouchableOpacity
          key={i + 1}
          onPress={item.action}
          style={tw`px-3 py-3 bg-blue-700 mx-2 mb-2`}
        >
          <Text style={tw`text-white text-base`}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Menus;
