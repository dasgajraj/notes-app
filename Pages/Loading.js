// loading.js

import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3498db" />
      <Text style={styles.text}>Loading your notes...</Text>
      <Text style={styles.text}>Notes App: Cooked By Das Gajraj Sharma</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: "#333",
  },
});

export default LoadingScreen;
