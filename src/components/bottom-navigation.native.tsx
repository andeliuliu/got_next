import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "feed", icon: "home-outline" as const, label: "Feed" },
    { id: "games", icon: "basketball-outline" as const, label: "Games" },
    { id: "social", icon: "people-outline" as const, label: "Social" },
    { id: "profile", icon: "person-circle-outline" as const, label: "Profile" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              style={styles.button}
              onPress={() => onTabChange(tab.id)}
              accessibilityRole="button"
            >
              <Ionicons name={tab.icon} size={22} color={isActive ? "#2563eb" : "#6b7280"} />
              <Text style={[styles.label, isActive ? styles.labelActive : undefined]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    paddingTop: 6,
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  label: {
    fontSize: 11,
    color: "#6b7280",
    marginTop: 2,
  },
  labelActive: {
    color: "#2563eb",
    fontWeight: "600",
  },
});


