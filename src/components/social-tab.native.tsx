import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function SocialTab() {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Social</Text>
      <Text style={styles.muted}>Discover friends and groups here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: "center", justifyContent: "center", paddingVertical: 40 },
  title: { fontSize: 18, fontWeight: "600", color: "#111827", marginBottom: 6 },
  muted: { fontSize: 14, color: "#6b7280" },
});


