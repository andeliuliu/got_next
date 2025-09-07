import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface GameCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: Array<{ id: string; name: string; avatar?: string }>;
  maxPlayers: number;
  status: "upcoming" | "live" | "completed";
  isJoined: boolean;
}

export function GameCard({ title, date, time, location, participants, maxPlayers, status, isJoined }: GameCardProps) {
  const spotsLeft = maxPlayers - participants.length;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          <View style={[styles.badge, status === "live" ? styles.badgeLive : status === "completed" ? styles.badgeCompleted : styles.badgeUpcoming]}>
            <Text style={styles.badgeText}>
              {status === "live" ? "Live" : status === "completed" ? "Completed" : "Upcoming"}
            </Text>
          </View>
        </View>
        {isJoined ? (
          <Ionicons name="chatbubble-ellipses-outline" size={18} color="#6b7280" />
        ) : null}
      </View>

      <View style={styles.gridRow}>
        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={16} color="#6b7280" />
          <Text style={styles.metaText}>{date}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="time-outline" size={16} color="#6b7280" />
          <Text style={styles.metaText}>{time}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Ionicons name="location-outline" size={16} color="#6b7280" />
        <Text style={styles.metaText}>{location}</Text>
      </View>

      <View style={styles.footerRow}>
        <View style={styles.row}>
          <Ionicons name="people-outline" size={16} color="#6b7280" />
          <Text style={styles.metaText}>{participants.length}/{maxPlayers}</Text>
        </View>
        {!isJoined && status === "upcoming" ? (
          <View style={[styles.joinPill, spotsLeft > 0 ? styles.joinPillActive : styles.joinPillDisabled]}>
            <Text style={[styles.joinText, spotsLeft > 0 ? styles.joinTextActive : styles.joinTextDisabled]}>
              {spotsLeft > 0 ? `Join (${spotsLeft} left)` : "Full"}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },
  badgeLive: { backgroundColor: "#dcfce7" },
  badgeCompleted: { backgroundColor: "#e5e7eb" },
  badgeUpcoming: { backgroundColor: "#dbeafe" },
  gridRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: "#6b7280",
  },
  footerRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  joinPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  joinPillActive: { backgroundColor: "#2563eb" },
  joinPillDisabled: { backgroundColor: "#e5e7eb" },
  joinText: { fontSize: 12, fontWeight: "600" },
  joinTextActive: { color: "#ffffff" },
  joinTextDisabled: { color: "#6b7280" },
});


