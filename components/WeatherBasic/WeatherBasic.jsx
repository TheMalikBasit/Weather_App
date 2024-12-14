import { Txt } from "../Txt/Txt";
import { s } from "./WeatherBasic.style";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Clock } from "../Clock/Clock";
import { useNavigation } from "@react-navigation/native";
export function WeatherBasic({
  temperature,
  interpretation,
  city,
  dailyWeather,
}) {
  const nav = useNavigation();

  return (
    <>
      <View style={s.clock}>
        <Clock />
      </View>
      <View>
        <Txt style={s.city}>{city}</Txt>
      </View>

      <View style={s.interpretation}>
        <Txt style={s.interpretation_txt}>{interpretation.label}</Txt>
      </View>

      <View style={s.temperature_box}>
        <TouchableOpacity
          onPress={() => nav.navigate("Forecasts", { city, ...dailyWeather })}
        >
          <Txt style={s.temperature}>{temperature}°</Txt>
        </TouchableOpacity>
        <Image style={s.image} source={interpretation.image} />
      </View>
    </>
  );
}
