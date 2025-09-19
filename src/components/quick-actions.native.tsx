import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface QuickActionsProps {
  onCreateNewGame: () => void;
  onCreateNewGroup: () => void;
}

export function QuickActions({ onCreateNewGame, onCreateNewGroup }: QuickActionsProps) {
  const items = [
    { id: "group", label: "Create Group", icon: "people-circle-outline" as const, onPress: onCreateNewGroup },
    { id: "create", label: "Create Game", icon: "add-circle-outline" as const, onPress: onCreateNewGame },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.grid}>
        {items.map((item) => (
          <Pressable key={item.id} style={styles.tile} onPress={item.onPress}>
            <Ionicons name={item.icon} size={22} color="#111827" />
            <Text style={styles.tileText}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    padding: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  tile: {
    width: "48%",
    height: 72,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    gap: 6,
  },
  tileText: { fontSize: 12, color: "#111827" },
});


