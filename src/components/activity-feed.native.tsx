import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function ActivityFeed() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    justifyContent: "center", 
    alignItems: "center", 
    flex: 1,
    minHeight: 400
  },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  text: { fontSize: 24, color: "#374151", textAlign: "center", fontWeight: "500" },
});


