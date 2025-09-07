import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  title: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  showProfile?: boolean;
  userAvatar?: string;
  userName?: string;
}

export function Header({
  title,
  showSearch = false,
  showNotifications = false,
  showProfile = false,
  userAvatar,
  userName = "User",
}: HeaderProps) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.actions}>
        {showSearch ? (
          <Ionicons name="search-outline" size={22} color="#111827" />
        ) : null}
        {showNotifications ? (
          <Ionicons name="notifications-outline" size={22} color="#111827" />
        ) : null}
        {showProfile ? (
          userAvatar ? (
            <Image source={{ uri: userAvatar }} style={styles.avatar} />)
          : (
            <View style={[styles.avatar, styles.avatarFallback]}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          )
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  avatarFallback: {
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },
});


