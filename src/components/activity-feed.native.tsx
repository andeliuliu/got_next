import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function ActivityFeed() {
  const items = [
    { id: "1", icon: "basketball-outline" as const, text: "Alex joined Friday Night Hoops" },
    { id: "2", icon: "people-outline" as const, text: "Jordan followed you" },
  ];

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View key={item.id} style={styles.row}>
          <Ionicons name={item.icon} size={18} color="#6b7280" />
          <Text style={styles.text}>{item.text}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  text: { fontSize: 14, color: "#374151" },
});


