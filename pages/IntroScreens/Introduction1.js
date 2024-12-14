import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Intro1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Weather App! (Intro 1)</Text>
      <Button title="Next" onPress={() => navigation.navigate("Intro2")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Intro1;
