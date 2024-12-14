import { s } from "./App.style";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaFrame,
} from "react-native-safe-area-context";
import { Home } from "./pages/Home/Home";
import { Alert, Button, ImageBackground } from "react-native";
import backgroundImg from "./assets/background.png";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { useEffect, useState } from "react";
import { WeatherAPI } from "./api/weather";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Forecasts } from "./pages/Forecasts/Forecasts";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [city, setCity] = useState();
  const [showIntro, setShowIntro] = useState(true);

  const [isFontLoaded] = useFonts({
    "Alata-Regular": require("./assets/fonts/Alata-Regular.ttf"),
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
    getUserCoordinates();
  }, []);

  useEffect(() => {
    if (coordinates) {
      fetchWeatherByCoords(coordinates);
      fetchCityByCoords(coordinates);
    }
  }, [coordinates]);

  async function fetchWeatherByCoords(coords) {
    try {
      const weatherResponse = await WeatherAPI.fetchWeatherByCoords(coords);
      setWeather(weatherResponse); // Update the weather state here
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
    } catch (error) {
      Alert.alert("Oppsi", error);
    }
  }

  async function getUserCoordinates() {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await getCurrentPositionAsync();
      setCoordinates({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
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
      >
        <SafeAreaProvider>
          <SafeAreaView style={s.container}>
            {isFontLoaded && (
              <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={showIntro ? "Intro1" : "Home"}
              >
                {/* Intro Screens */}
                {showIntro && (
                  <>
                    <Stack.Screen name="Intro1" component={Intro1} />
                    <Stack.Screen name="Intro2" component={Intro2} />
                    <Stack.Screen name="Intro3">
                      {() => <Intro3 onCompletion={handleIntroCompletion} />}
                    </Stack.Screen>
                  </>
                )}

                {/* Main App Screens */}
                <Stack.Screen name="Home">
                  {() => (
                    <Home
                      city={city}
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
