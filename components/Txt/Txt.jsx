import { s } from "./Txt.style";
import { Text } from "react-native";
export function Txt({ children, style, ...restProps }) {
  return (
    <Text style={[s.txt, style]} {...restProps}>
      {children}
    </Text>
  );
}
