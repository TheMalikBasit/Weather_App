import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Intro2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Intro Screen 2</Text>
      <Button title="Next" onPress={() => navigation.navigate("Intro3")} />
    </View>
  );
};

export default Intro2;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, fontWeight: "bold" },
});
