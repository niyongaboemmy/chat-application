import React, { useState } from "react";
import { KeyboardType, TextInput, View } from "react-native";
import tw from "tailwind-react-native-classnames";

interface InputTextProps {
  value?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardType;
  onChange?: (e: any) => void;
  styles?: string;
}

const InputText = (props: InputTextProps) => {
  const [inputStyle, setInputStyle] = useState<string>("bg-gray-200");
  return (
    <View style={tw`w-full`}>
      <TextInput
        style={tw`${inputStyle} px-6 rounded pb-2 text-base flex flex-col justify-center my-2 h-14 text-gray-700 ${
          props.styles !== undefined ? props.styles : ""
        }`}
        value={props.value}
        onChangeText={props.onChange}
        placeholder={props.placeholder}
        returnKeyType="done"
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        onFocus={() =>
          setInputStyle(
            "bg-white border-2 border-blue-500 text-blue-600 font-bold"
          )
        }
        onBlur={() => setInputStyle("bg-gray-200")}
      />
    </View>
  );
};

export default InputText;
