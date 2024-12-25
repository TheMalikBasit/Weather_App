import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
 advanced: {
    marginTop: "auto",
    marginBottom: 50,
  },
  container: {
    flex: 1,
  },
  city_time_container: {
    marginTop: "30%",
    marginLeft: 20,
  },
  city: {
    fontSize: 50,
    fontFamily: "Arial",
    color: "white",
    fontWeight: 600,
  },
  date: {
    fontSize: 18,
    color: "white",
    marginTop: 5,
  },
  time: {
    fontSize: 20,
    fontFamily: "Arial",
    color: "white",
  },
  temperature_box: {
    marginLeft: 20,
    marginTop: "auto",
    alignItems: "flex-start",
  },
  temperature: {
    fontSize: 100,
    fontFamily: "Arial",
    color: "white",
    
  },
  weather_icon: {
    width: 50,
    height: 50,
  },
  temperature_box_In:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  weather_status: {
    fontSize: 30,
    fontFamily: "Arial",
    color: "white",
    marginTop: 10,
  },
  searchBar: {
    width: '80%',
    borderRadius: 10,
    position: 'absolute',
    top: 20,
    left: "10%"
  },
});