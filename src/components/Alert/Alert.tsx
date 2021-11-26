import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import ButtonItem, { ButtonThemes } from "../styles/ButtonItem";

export enum AlertThemes {
  Primary = "Primary",
  Secondary = "Secondary",
  Danger = "Danger",
  Warning = "Warning",
  Success = "Success",
}

interface AlertProps {
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  theme?: AlertThemes;
  cancel?: () => void;
  confirm?: () => void;
}

const getClassName = (alert_theme: AlertThemes) => {
  switch (alert_theme) {
    case AlertThemes.Primary:
      return "blue";
    case AlertThemes.Secondary:
      return "gray";
    case AlertThemes.Success:
      return "green";
    case AlertThemes.Danger:
      return "red";
    case AlertThemes.Warning:
      return "yellow";
    default:
      return "blue";
  }
};

const Alert = (props: AlertProps) => {
  return (
    <View
      style={[
        tw`top-0 left-0 bg-gray-300 h-full w-full`,
        { position: "fixed", top: 0, left: 0, height: "100%" },
      ]}
    >
      <View style={tw`bg-white rounded-lg mt-10 z-50 mx-10`}>
        <View
          style={tw`${
            props.theme !== undefined
              ? "bg-" + getClassName(props.theme) + "-600"
              : "bg-blue-500"
          } px-3 py-4 z-50 rounded-t-lg`}
        >
          <Text style={tw`text-xl font-bold text-white text-center`}>
            {props.title}
          </Text>
        </View>
        <View style={tw`px-2 py-3`}>
          <Text style={tw`text-base text-center`}>{props.description}</Text>
        </View>
        <View
          style={tw`flex flex-row items-center justify-between px-3 py-3 bg-gray-50 rounded-b-lg`}
        >
          <TouchableOpacity
            onPress={() => props.cancel !== undefined && props.cancel()}
            style={tw`bg-gray-100 px-3 py-2 rounded-lg`}
          >
            <View>
              <Text style={tw`text-base font-bold text-gray-500`}>
                {props.cancelText !== undefined ? props.cancelText : "Cancel"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.confirm !== undefined && props.confirm()}
            style={tw`${
              props.theme !== undefined
                ? "bg-" + getClassName(props.theme) + "-100"
                : "bg-blue-100"
            } px-3 py-2 rounded-lg`}
          >
            <View>
              <Text
                style={tw`text-base font-bold ${
                  props.theme !== undefined
                    ? "text-" + getClassName(props.theme) + "-600"
                    : "bg-blue-500"
                }`}
              >
                {props.confirmText !== undefined
                  ? props.confirmText
                  : "Confirm"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Alert;
