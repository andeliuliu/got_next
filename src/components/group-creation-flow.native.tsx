import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { friendsSeed } from "../mocks/friends";
import { Friend, GroupCreationData } from "../types/group";

interface GroupCreationFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (group: GroupCreationData) => void;
}

export function GroupCreationFlow({ isOpen, onClose, onComplete }: GroupCreationFlowProps) {
  const [step, setStep] = useState<"form" | "confirm">("form");
  const [name, setName] = useState("");
  // description removed per latest requirement
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const canNext = useMemo(() => name.trim().length > 0, [name]);
  const selectedFriends: Friend[] = useMemo(() => friendsSeed.filter(f => selectedIds.includes(f.id)), [selectedIds]);
  const filteredFriends = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return friendsSeed;
    return friendsSeed.filter((f) => f.name.toLowerCase().includes(q));
  }, [search]);

  function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || "";
    const second = parts[1]?.[0] || "";
    return (first + second).toUpperCase();
  }

  function toggle(id: string) {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  return (
    <Modal visible={isOpen} onRequestClose={onClose} animationType="fade" transparent>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <ScrollView contentContainerStyle={styles.cardContent}>
            {step === "form" ? (
              <>
                <Text style={styles.header}>Create Group</Text>
                <View style={styles.field}>
                  <Text style={styles.label}>Group name</Text>
                  <TextInput value={name} onChangeText={setName} placeholder="Friday Squad" style={styles.input} />
                </View>
                
                <View style={styles.field}>
                  <Text style={styles.label}>Add friends</Text>
                  <View style={[styles.input, styles.searchInput]}>
                    <Ionicons name="search" size={16} color="#6b7280" />
                    <TextInput
                      value={search}
                      onChangeText={setSearch}
                      placeholder="Search friends"
                      placeholderTextColor="#6b7280"
                      style={styles.searchText}
                    />
                  </View>
                  <View style={styles.listBox}>
                    <ScrollView>
                      {filteredFriends.map((f) => {
                        const active = selectedIds.includes(f.id);
                        return (
                          <Pressable key={f.id} style={[styles.rowItem, active ? styles.rowItemActive : undefined]} onPress={() => toggle(f.id)}>
                            <View style={styles.rowLeft}>
                              <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{getInitials(f.name)}</Text>
                              </View>
                              <Text style={styles.rowName}>{f.name}</Text>
                            </View>
                            <View style={[styles.selectCircle, active ? styles.selectCircleActive : undefined]} />
                          </Pressable>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>

                <View style={[styles.actions, { justifyContent: "space-between" }]}>
                  <Pressable style={[styles.button, styles.buttonGhost]} onPress={onClose}>
                    <Text style={[styles.buttonText, styles.buttonGhostText]}>Cancel</Text>
                  </Pressable>
                  <Pressable style={[styles.button, canNext ? styles.buttonPrimary : styles.buttonDisabled]} disabled={!canNext} onPress={() => setStep("confirm")}>
                    <Text style={[styles.buttonText, styles.buttonPrimaryText]}>Next</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                <View style={styles.reviewHeader}>
                  <Pressable onPress={() => setStep("form")} style={styles.backButton} accessibilityLabel="Back">
                    <Ionicons name="chevron-back" size={20} color="#111827" />
                  </Pressable>
                  <Text style={styles.reviewTitle}>Review</Text>
                </View>
                <Text style={styles.reviewSub}>Confirm your group details before creating</Text>
                <View style={styles.stepsBar}>
                  <View style={[styles.stepDot]} />
                  <View style={[styles.stepDot]} />
                  <View style={[styles.stepDotActive]} />
                </View>

                <View style={styles.confirmCard}>
                  <View style={styles.confirmRow}>
                    <Ionicons name="person-outline" size={18} color="#6b7280" />
                    <Text style={styles.confirmText}>{name || "(No name)"}</Text>
                  </View>
                  <View style={styles.confirmRow}>
                    <Ionicons name="people-outline" size={18} color="#6b7280" />
                    <Text style={styles.confirmText}>{selectedFriends.length} member{selectedFriends.length === 1 ? "" : "s"}</Text>
                  </View>

                  <View style={{ height: 6 }} />
                  <Text style={styles.invitedLabel}>Invited friends:</Text>
                  <View style={styles.chipsWrap}>
                    {selectedFriends.length === 0 ? (
                      <Text style={styles.emptyInvite}>No friends selected</Text>
                    ) : (
                      selectedFriends.map((f) => (
                        <View key={f.id} style={styles.pill}>
                          <Text style={styles.pillText}>{f.name}</Text>
                        </View>
                      ))
                    )}
                  </View>
                </View>

                <View style={{ height: 12 }} />

                <View style={[styles.actions, { justifyContent: "space-between" }]}>
                  <Pressable style={[styles.button, styles.buttonGhost]} onPress={() => setStep("form")}>
                    <Text style={[styles.buttonText, styles.buttonGhostText]}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonDark]}
                    onPress={() => {
                      onComplete({ name: name.trim(), memberIds: selectedIds });
                      onClose();
                      setStep("form");
                      setName("");
                      setSelectedIds([]);
                    }}
                  >
                    <Text style={[styles.buttonText, styles.buttonDarkText]}>Create Group</Text>
                  </Pressable>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center", padding: 16 },
  card: { width: "100%", maxWidth: 420, maxHeight: "85%", backgroundColor: "#ffffff", borderRadius: 12 },
  cardContent: { padding: 20, gap: 12 },
  header: { fontSize: 18, fontWeight: "700", color: "#111827" },
  reviewTitle: { fontSize: 18, fontWeight: "700", color: "#111827" },
  reviewHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  backButton: { padding: 4 },
  reviewSub: { color: "#6b7280", marginTop: 4 },
  stepsBar: { flexDirection: "row", gap: 8, marginTop: 12, marginBottom: 8 },
  stepDot: { height: 4, flex: 1, backgroundColor: "#e5e7eb", borderRadius: 2 },
  stepDotActive: { height: 4, flex: 1, backgroundColor: "#111827", borderRadius: 2 },
  field: { gap: 6 },
  label: { fontSize: 13, color: "#6b7280" },
  input: { borderWidth: StyleSheet.hairlineWidth, borderColor: "#c7cdd6", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 10, fontSize: 14, color: "#374151", backgroundColor: "#f3f4f6" },
  listBox: { borderWidth: StyleSheet.hairlineWidth, borderColor: "#e5e7eb", borderRadius: 12, maxHeight: 300, backgroundColor: "#ffffff" },
  rowItem: { paddingHorizontal: 12, paddingVertical: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: StyleSheet.hairlineWidth, borderColor: "#c7cdd6", borderRadius: 12, marginHorizontal: 8, marginVertical: 6, backgroundColor: "#ffffff" },
  rowItemActive: { backgroundColor: "#f9fafb" },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#e5e7eb", alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#111827", fontWeight: "700", fontSize: 12 },
  rowName: { color: "#111827", fontSize: 14, fontWeight: "600" },
  selectCircle: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: "#c7cdd6" },
  selectCircleActive: { borderColor: "#2563eb", backgroundColor: "#2563eb" },
  searchInput: { flexDirection: "row", alignItems: "center", gap: 8 },
  searchText: { flex: 1, color: "#374151" },
  summaryBox: { borderWidth: StyleSheet.hairlineWidth, borderColor: "#e5e7eb", borderRadius: 8, padding: 12, backgroundColor: "#ffffff" },
  summaryLabel: { color: "#6b7280", fontSize: 12, marginBottom: 4 },
  summaryValue: { color: "#111827", fontSize: 14 },
  confirmCard: { borderWidth: StyleSheet.hairlineWidth, borderColor: "#e5e7eb", borderRadius: 12, padding: 12, backgroundColor: "#ffffff" },
  confirmRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  confirmText: { color: "#111827", fontSize: 14 },
  invitedLabel: { color: "#6b7280", fontSize: 12, marginBottom: 6 },
  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  pill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: "#f3f4f6" },
  pillText: { color: "#111827", fontSize: 12, fontWeight: "600" },
  emptyInvite: { color: "#6b7280", fontSize: 13 },
  actions: { flexDirection: "row", gap: 10 },
  button: { borderRadius: 8, paddingHorizontal: 16, paddingVertical: 10 },
  buttonGhost: { backgroundColor: "#f3f4f6" },
  buttonGhostText: { color: "#111827" },
  buttonPrimary: { backgroundColor: "#2563eb" },
  buttonDark: { backgroundColor: "#0f172a" },
  buttonDarkText: { color: "#ffffff" },
  buttonDisabled: { backgroundColor: "#e5e7eb" },
  buttonText: { fontSize: 14, fontWeight: "600" },
  buttonPrimaryText: { color: "#ffffff" },
});


