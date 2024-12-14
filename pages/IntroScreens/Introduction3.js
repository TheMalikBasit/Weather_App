import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Intro3 = ({ navigation, onCompletion }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Intro Screen 3</Text>
      <Button
        title="Get Started"
        onPress={() => {
          onCompletion();
          navigation.replace("Home");
        }}
      />
    </View>
  );
};

export default Intro3;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, fontWeight: "bold" },
});
