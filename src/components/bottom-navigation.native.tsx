import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TabId } from "../types/navigation";

interface BottomNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs: Array<{ id: TabId; icon: keyof typeof Ionicons.glyphMap; label: string }> = [
    { id: "feed", icon: "home-outline", label: "Feed" },
    { id: "games", icon: "basketball-outline", label: "Games" },
    { id: "friends", icon: "people-outline", label: "Friends" },
    { id: "profile", icon: "person-circle-outline", label: "Profile" },
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


