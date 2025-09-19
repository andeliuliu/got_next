import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface QuickGameCreateProps {
  onCreateGame: (groupId: string, time: string) => void;
}

type QuickGroup = {
  id: string;
  name: string;
  members: Array<{ id: string; name: string; avatar?: string }>;
  usualLocation: string;
  usualTimes: string[];
  lastPlayed: string;
  isActive: boolean;
};

const mockQuickGroups: QuickGroup[] = [
  {
    id: "1",
    name: "Friday Squad",
    members: [
      { id: "1", name: "Alex Rodriguez" },
      { id: "2", name: "Maya Patel" },
      { id: "3", name: "Chris Johnson" },
      { id: "4", name: "Sarah Chen" },
      { id: "5", name: "Jordan Smith" },
    ],
    usualLocation: "Riverside Park Court",
    usualTimes: ["7:00 PM", "6:30 PM", "7:30 PM"],
    lastPlayed: "2 days ago",
    isActive: true,
  },
  {
    id: "2",
    name: "Weekend Warriors",
    members: [
      { id: "6", name: "Marcus Davis" },
      { id: "7", name: "Lisa Wang" },
      { id: "8", name: "Tyler Brown" },
      { id: "9", name: "Emma Wilson" },
    ],
    usualLocation: "Central Park Courts",
    usualTimes: ["2:00 PM", "1:30 PM", "3:00 PM"],
    lastPlayed: "1 week ago",
    isActive: true,
  },
];

export function QuickGameCreate({ onCreateGame }: QuickGameCreateProps) {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const selectedGroup = useMemo(
    () => mockQuickGroups.find((g) => g.id === selectedGroupId) || null,
    [selectedGroupId],
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Quick Game Setup</Text>
        <View style={styles.pill}>
          <Ionicons name="flash-outline" size={14} color="#111827" />
          <Text style={styles.pillText}>Fast</Text>
        </View>
      </View>

      {!selectedGroup ? (
        <View style={styles.list}>
          {mockQuickGroups.map((group) => (
            <Pressable key={group.id} style={styles.groupCard} onPress={() => setSelectedGroupId(group.id)}>
              <View style={styles.groupHeader}>
                <Text style={styles.groupName}>{group.name}</Text>
                <Pressable style={styles.playButton} onPress={() => setSelectedGroupId(group.id)}>
                  <Ionicons name="flash-outline" size={16} color="#ffffff" />
                  <Text style={styles.playButtonText}>Play</Text>
                </Pressable>
              </View>
              <View style={styles.metaRow}>
                <Ionicons name="location-outline" size={14} color="#6b7280" />
                <Text style={styles.metaText}>{group.usualLocation}</Text>
              </View>
              <View style={styles.metaRow}>
                <Ionicons name="people-outline" size={14} color="#6b7280" />
                <Text style={styles.metaText}>{group.members.length} players</Text>
              </View>
            </Pressable>
          ))}
        </View>
      ) : (
        <View style={styles.detailCard}>
          <View style={styles.detailHeader}>
            <Text style={styles.groupName}>{selectedGroup.name}</Text>
            <Pressable style={styles.back} onPress={() => setSelectedGroupId(null)}>
              <Text style={styles.backText}>← Back</Text>
            </Pressable>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={14} color="#6b7280" />
            <Text style={styles.metaText}>{selectedGroup.usualLocation}</Text>
          </View>
          <Text style={styles.subTitle}>When do you want to play?</Text>
          <View style={styles.timesGrid}>
            {selectedGroup.usualTimes.map((time) => (
              <Pressable
                key={time}
                style={styles.timeButton}
                onPress={() => onCreateGame(selectedGroup.id, `Today ${time}`)}
              >
                <Ionicons name="time-outline" size={14} color="#111827" />
                <Text style={styles.timeButtonText}>{time}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 10 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { fontSize: 16, fontWeight: "600", color: "#111827" },
  pill: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#e5e7eb", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  pillText: { fontSize: 12, fontWeight: "600", color: "#111827" },
  list: { gap: 10 },
  groupCard: { borderWidth: StyleSheet.hairlineWidth, borderColor: "#e5e7eb", borderRadius: 10, padding: 12, backgroundColor: "#ffffff", gap: 6 },
  groupHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  groupName: { fontSize: 15, fontWeight: "600", color: "#111827" },
  playButton: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#2563eb", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  playButtonText: { color: "#ffffff", fontSize: 12, fontWeight: "600" },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { fontSize: 13, color: "#6b7280" },
  createTile: { height: 56, borderRadius: 10, borderWidth: StyleSheet.hairlineWidth, borderColor: "#93c5fd", alignItems: "center", justifyContent: "center", backgroundColor: "#eff6ff", flexDirection: "row", gap: 8 },
  createTileText: { color: "#2563eb", fontWeight: "600" },
  detailCard: { borderWidth: StyleSheet.hairlineWidth, borderColor: "#e5e7eb", borderRadius: 10, padding: 12, backgroundColor: "#ffffff", gap: 10 },
  detailHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  back: { paddingHorizontal: 8, paddingVertical: 4 },
  backText: { color: "#2563eb", fontSize: 12, fontWeight: "600" },
  subTitle: { fontSize: 14, fontWeight: "600", color: "#111827", marginTop: 6, marginBottom: 4 },
  timesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  timeButton: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: StyleSheet.hairlineWidth, borderColor: "#e5e7eb", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, backgroundColor: "#f9fafb" },
  timeButtonText: { fontSize: 13, color: "#111827" },
});


