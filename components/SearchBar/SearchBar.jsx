import { TextInput } from "react-native";
import { s } from "./SearchBar.style";

export function SearchBar({ onSubmit }) {
  return (
    <TextInput
      onSubmitEditing={(e) => onSubmit(e.nativeEvent.text)}
      style={s.input}
      placeholder="Type a city...."
    />
  );
}
