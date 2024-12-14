import {
  s,
  StyledContainer,
  StyledLabel,
  StyledValue,
} from "./WeatherAdvanced.style";
import { Txt } from "../Txt/Txt";
import { View } from "react-native";

export function WeatherAdvanced({ sunrise, sunset, windspeed }) {
  return (
    <View style={s.constainer}>
      <StyledContainer>
        <StyledLabel>{sunrise}</StyledLabel>
        <StyledValue>Sunrise</StyledValue>
      </StyledContainer>

      <StyledContainer>
        <StyledLabel>{sunset}</StyledLabel>
        <StyledValue>Sunset</StyledValue>
      </StyledContainer>

      <StyledContainer>
        <StyledLabel>{windspeed} km/h</StyledLabel>
        <StyledValue>Wind Speed</StyledValue>
      </StyledContainer>
    </View>
  );
}
