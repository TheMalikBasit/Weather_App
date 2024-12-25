import { s } from "./App.style";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import { Alert, ImageBackground } from "react-native";
import backgroundImgSunny from "./assets/Sunny.jpg";
import backgroundImgRain from "./assets/Rain1.jpg";
import backgroundImgClouds from "./assets/Clouds.jpg";
import backgroundImgSnow from "./assets/Snow4.jpg";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Home } from "./pages/Home/Home";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { WeatherAPI } from "./api/weather";
import { Forecasts } from "./pages/Forecasts/Forecasts";

// Import Intro screens
import Intro1 from "./pages/IntroScreens/Introduction1";
import Intro2 from "./pages/IntroScreens/Introduction2";
import Intro3 from "./pages/IntroScreens/Introduction3";

const Stack = createNativeStackNavigator();
const navTheme = {
  colors: {
    background: "transparent",
  },
};

export default function App() {
  const [coordinates, setCoordinates] = useState();
  const [weather, setWeather] = useState();
  const [city, setCity] = useState("Lahore");
  const [showIntro, setShowIntro] = useState(true);
  const [currentCity, setCurrentCity] = useState();
  const [backgroundImg, setBackgroundImg] = useState(backgroundImgClouds); // Default background image
  const [isFontLoaded] = useFonts({
    "Alata-Regular": require("./assets/fonts/Alata-Regular.ttf"),
    "Arial": require("./assets/fonts/Arial.ttf"), // Ensure Arial font is available
  });

  // Check if intro screens have already been shown
  useEffect(() => {
    const checkIntro = async () => {
      const introShown = await AsyncStorage.getItem("introShown");
      if (introShown) {
        setShowIntro(false);
      }
    };
    checkIntro();
  }, []);

  // Mark intro as complete
  const handleIntroCompletion = async () => {
    await AsyncStorage.setItem("introShown", "true");
    setShowIntro(false);
  };

  useEffect(() => {
    getDefaultCityFunction();
  }, []);

  useEffect(() => {
    getUserCoordinates();
  }, []);

  useEffect(() => {
    if (coordinates) {
      fetchWeatherByCoords(coordinates);
      fetchCityByCoords(coordinates);
    }
  }, [coordinates]);

  //Get your current DefaultCity
  async function getDefaultCityFunction() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied.");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      let address = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (address && address.length > 0) {
        setCurrentCity(address[0].city || "Unknown City");
        setCity(address[0].city || "Unknown City");  // Set the initial city
        console.log("City:", address[0].city);
      } else {
        console.log("City not found in reverse geocode response.");
        setCurrentCity("Unknown City");
        setCity("Unknown City");  // Set the initial city
      }
    } catch (error) {
      Alert.alert("Error", error.message);
      console.error("Error fetching city:", error.message);
    }
  }

  async function fetchWeatherByCoords(coords) {
    try {
      const weatherResponse = await WeatherAPI.fetchWeatherByCoords(coords);
      setWeather(weatherResponse);

      // Set background image based on weather condition
      const weatherCode = weatherResponse.current_weather.weathercode;
      if (weatherCode === 0) {
        setBackgroundImg(backgroundImgSunny);
      } else if ([1, 2, 3, 45, 48].includes(weatherCode)) {
        setBackgroundImg(backgroundImgClouds);
      } else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(weatherCode)) {
        setBackgroundImg(backgroundImgRain);
      } else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
        setBackgroundImg(backgroundImgSnow);
      } 
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  async function fetchCityByCoords(coords) {
    const cityResponse = await WeatherAPI.fetchCityByCoords(coords);
    setCity(cityResponse);
  }

  async function fetchCoordsByCity(city) {
    try {
      const coordsResponse = await WeatherAPI.fetchCoordsByCity(city);
      setCoordinates(coordsResponse);
      fetchWeatherByCoords(coordsResponse); // Fetch weather for the new city
      setCity(city); // Update the city state
    } catch (error) {
      Alert.alert("Oops", error);
    }
  }

  async function getUserCoordinates() {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      const DefaultCity = await getCurrentPositionAsync();
      setCoordinates({
        lat: DefaultCity.coords.latitude,
        lng: DefaultCity.coords.longitude,
      });
    } else {
      setCoordinates({ lat: "48.85", lng: "2.35" });
    }
  }

  return (
    <NavigationContainer theme={navTheme}>
      <ImageBackground
        imageStyle={s.img}
        style={s.img_background}
        source={backgroundImg}
        blurRadius={2} // Add blur radius
      >
        <SafeAreaProvider>
          <SafeAreaView style={s.container}>
            {isFontLoaded && (
              <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={showIntro ? "Intro1" : "Home"}
              >
                {showIntro && (
                  <>
                    <Stack.Screen name="Intro1" component={Intro1} />
                    <Stack.Screen name="Intro2" component={Intro2} />
                    <Stack.Screen name="Intro3">
                      {() => <Intro3 onCompletion={handleIntroCompletion} />}
                    </Stack.Screen>
                  </>
                )}
                <Stack.Screen name="Home">
                  {() => (
                    <Home
                      city={city} // Pass the updated city state
                      weather={weather}
                      onSubmitSearch={fetchCoordsByCity}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen name="Forecasts" component={Forecasts} />
              </Stack.Navigator>
            )}
          </SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    </NavigationContainer>
  );
}
