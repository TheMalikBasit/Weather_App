import { useState } from "react";
import { TextInput, TouchableOpacity, View, Animated, Easing } from "react-native";
import { s } from "./SearchBar.style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export function SearchBar({ onSubmit }) {
  return (
    <TextInput
      onSubmitEditing={(e) => onSubmit(e.nativeEvent.text)}
      style={s.input}
      placeholder="Type a city...."
    />
  );
}
