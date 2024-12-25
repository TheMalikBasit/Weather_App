import React from "react";
import { View, Text } from "react-native";
import { s } from "./WeatherAdvanced.style";
import { convertTo12HourFormat } from "../../utils/12HourFormat";

export function WeatherAdvanced({ sunrise, sunset, windspeed }) {
  return (
    <View style={s.container}>
      {/* Sunrise */}
      <View style={s.item}>
        <Text style={s.label}>Sunrise</Text>
        <Text style={s.value}>{convertTo12HourFormat(sunrise)}</Text>
        <Text style={s.unit}></Text>
      </View>

      {/* Sunset */}
      <View style={s.item}>
        <Text style={s.label}>Sunset</Text>
        <Text style={s.value}>{convertTo12HourFormat(sunset)}</Text>
        <Text style={s.unit}></Text>
      </View>

      {/* Wind Speed */}
      <View style={s.item}>
        <Text style={s.label}>Wind</Text>
        <Text style={s.value}>{windspeed}</Text>
        <Text style={s.unit}>km/h</Text>
      </View>
    </View>
  );
}