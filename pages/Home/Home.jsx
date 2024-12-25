import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import { s } from "./Home.style";
import { getWeatherInterpretation } from "../../utils/weather-utils";
import { nowTOHHMM } from "../../utils/date-time";
import { useNavigation } from "@react-navigation/native";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { WeatherAdvanced } from "../../components/WeatherAdvanced/WeatherAdvanced";
import { convertTo12HourFormat } from "../../utils/12HourFormat";
import { supabase } from "../Supabase/supabaseClient";
export function Home({ weather, city, onSubmitSearch }) {
  const nav = useNavigation();
  const [currentTime, setCurrentTime] = useState(nowTOHHMM());
  const [currentDate, setCurrentDate] = useState("");

  // Function to format and update date and time

  const updateDateTime = () => {
    const now = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = dayNames[now.getDay()];
    const date = now.toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" });
    setCurrentTime(nowTOHHMM());
    setCurrentDate(`${day}, ${date}`);
  };

  useEffect(() => {
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (!weather || !weather.current_weather) {
    return <Text style={s.loading}>Loading weather data...</Text>;
  }

  const currentWeather = weather.current_weather;
  const currentInterpretation = getWeatherInterpretation(
    currentWeather?.weathercode
  );

  return (
    <View style={s.container}>
      {/* City Name, Current Time, and Date */}
      <View style={s.city_time_container}>
        <Text style={s.city}>{city}</Text>
        <Text style={s.date}>{currentDate}</Text>
        <Text style={s.time}>{convertTo12HourFormat(currentTime)}</Text>
      </View>

      {/* Temperature and Weather Status */}
      <View style={s.temperature_box}>
        <Text style={s.temperature}>{Math.round(currentWeather?.temperature)}°</Text>
        <View style={s.temperature_box_In}>
          <Image style={s.weather_icon} source={currentInterpretation.image} />
          <Text style={s.weather_status}>{currentInterpretation.label}</Text>
        </View>
      </View>

      {/* Search Bar Section */}
      <View style={s.searchBar}>
        <SearchBar onSubmit={onSubmitSearch} />
      </View>

      {/* Advanced Weather Section */}
      <View style={s.advanced}>
        <WeatherAdvanced
          sunrise={weather?.daily?.sunrise?.[0]?.split("T")[1] || "N/A"}
          sunset={weather?.daily?.sunset?.[0]?.split("T")[1] || "N/A"}
          windspeed={currentWeather?.windspeed || 0}
        />
      </View>
      <TouchableOpacity onPress={() => supabase.auth.signOut()} style={s.verticallySpaced}>
        <Text style={s.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
