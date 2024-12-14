import { View } from "react-native";
import { s } from "./Home.style";
import { Txt } from "../../components/Txt/Txt";
import { WeatherBasic } from "../../components/WeatherBasic/WeatherBasic";
import { getWeatherInterpretation } from "../../utils/weather-utils";
import { WeatherAdvanced } from "../../components/WeatherAdvanced/WeatherAdvanced";
import { SearchBar } from "../../components/SearchBar/SearchBar";

export function Home({ weather, city, onSubmitSearch }) {
  // Check if weather or current_weather is undefined
  if (!weather || !weather.current_weather) {
    return <Txt>Loading weather data...</Txt>;
  }

  const currentWeather = weather.current_weather;
  const currentInterpretation = getWeatherInterpretation(
    currentWeather?.weathercode
  );

  return (
    <View style={s.container}>
      {/* Basic Weather Section */}
      <View style={s.basic}>
        <WeatherBasic
          dailyWeather={weather?.daily}
          city={city}
          interpretation={currentInterpretation}
          temperature={Math.round(currentWeather?.temperature)}
        />
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
    </View>
  );
}
