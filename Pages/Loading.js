// loading.js

import React from "react";
import { View, ActivityIndicator, Text, StyleSheet, Dimensions } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color="#2980b9" />
        <Text style={styles.loadingText}>Loading your notes...</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Notes App: Cooked By Das Gajraj Sharma</Text>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
  },
  loadingBox: {
    width: width * 0.8,
    maxWidth: 300,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 40,
  },
  footerText: {
    fontSize: 16,
    color: "#7f8c8d",
    fontWeight: "500",
  },
});

export default LoadingScreen;