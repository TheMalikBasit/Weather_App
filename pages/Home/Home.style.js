import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
 advanced: {
    marginTop: "auto",
    marginBottom: 70,
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
    marginTop: 10,
    left: "10%",
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
  verticallySpaced: {
    backgroundColor: "white",
    height: 50,
    width: "90%",
    // paddingLeft: "30%",
    // paddingRight: "30%",
    borderRadius: 15,
    justifyContent: "center",  // Make sure this aligns the text vertically
    alignItems: "center", // Ensure the text is centered horizontally
    shadowColor: "#000",
    position: "absolute",
    bottom: 10,
    marginLeft: "5%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    fontFamily: 'Alata-Regular',
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