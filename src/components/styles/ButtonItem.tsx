import React from "react";
import { Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";

export enum ButtonThemes {
  Default = "Default",
  Primary = "Primary",
  Secondary = "Secondary",
  Success = "Success",
  Danger = "Danger",
  Info = "Info",
  Warning = "Warning",
}

interface ButtonItemProps {
  title: string;
  theme?: ButtonThemes;
  style?: string;
  onPress: () => void;
}
const getColor = (theme: ButtonThemes | undefined) => {
  switch (theme) {
    case ButtonThemes.Primary:
      return "blue-500";
      break;
    case ButtonThemes.Info:
      return "blue-300";
      break;
    case ButtonThemes.Danger:
      return "red-500";
      break;
    case ButtonThemes.Success:
      return "green-500";
      break;
    case ButtonThemes.Secondary:
      return "gray-500";
      break;
    case ButtonThemes.Warning:
      return "yellow-500";
      break;
    default:
      return "white";
  }
};
const ButtonItem = ({ title, theme, style, onPress }: ButtonItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`bg-${getColor(
        theme
      )} px-8 py-4 rounded-full flex items-center ${
        style !== undefined ? style : ""
      }
      ${
        theme === undefined || theme === ButtonThemes.Default ? "shadow-md" : ""
      }`}
    >
      <Text
        style={tw`text-lg font-bold text-${
          theme === undefined || theme === ButtonThemes.Default
            ? "gray-600"
            : "white"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonItem;
