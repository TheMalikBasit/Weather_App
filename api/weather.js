import axios from "axios";

export class WeatherAPI {
    static async fetchWeatherByCoords(coords) {
        return (await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&daily=weathercode,temperature_2m_max,sunrise,sunset,windspeed_10m_max&timezone=auto&current_weather=true`
        )).data
    }

    static async fetchCityByCoords(coords) {
        const openCageApiKey = '141462e06efe4b1da0fb0ee681ecdfdd';

        try {
            const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${coords.lat}+${coords.lng}&key=${openCageApiKey}`
            );
            const { city, village, town } = response.data.results[0].components;
            return city || village || town;
        } catch (error) {
            console.error("Error fetching city from OpenCage API:", error);
            return null;
        }
    }
    // cocooo

    static async fetchCoordsByCity(city) {
        try {
            const { latitude: lat, longitude: lng } = (await axios.get(
                `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
            )).data.results[0]
            return { lat, lng }
        } catch (error) {
            throw "Invalid city name"
        }
    }

}