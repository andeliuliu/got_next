import React, { useMemo, useState } from "react";
import { Modal, View, Text, TextInput, Pressable, StyleSheet } from "react-native";

interface GameCreationFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (game: any) => void;
}

export function GameCreationFlow({ isOpen, onClose, onComplete }: GameCreationFlowProps) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("7:00 PM");
  const [maxPlayers, setMaxPlayers] = useState("10");

  const canSubmit = useMemo(() => title.trim().length > 0 && location.trim().length > 0, [title, location]);

  return (
    <Modal visible={isOpen} onRequestClose={onClose} animationType="slide" presentationStyle="formSheet">
      <View style={styles.container}>
        <Text style={styles.header}>Create Game</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Title</Text>
          <TextInput value={title} onChangeText={setTitle} placeholder="Pickup at Riverside" style={styles.input} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Location</Text>
          <TextInput value={location} onChangeText={setLocation} placeholder="Court name" style={styles.input} />
        </View>

        <View style={styles.row}>
          <View style={[styles.field, styles.flex1]}>
            <Text style={styles.label}>Time</Text>
            <TextInput value={time} onChangeText={setTime} placeholder="7:00 PM" style={styles.input} />
          </View>
          <View style={[styles.field, styles.flex1]}>
            <Text style={styles.label}>Max Players</Text>
            <TextInput value={maxPlayers} onChangeText={setMaxPlayers} keyboardType="numeric" placeholder="10" style={styles.input} />
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable style={[styles.button, styles.buttonGhost]} onPress={onClose}>
            <Text style={[styles.buttonText, styles.buttonGhostText]}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.button, canSubmit ? styles.buttonPrimary : styles.buttonDisabled]}
            disabled={!canSubmit}
            onPress={() => {
              onComplete({
                title,
                location,
                time,
                maxPlayers: Number(maxPlayers) || 10,
                date: new Date(),
                friends: [],
              });
              onClose();
              setTitle("");
              setLocation("");
            }}
          >
            <Text style={[styles.buttonText, styles.buttonPrimaryText]}>Create</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff", padding: 16, gap: 12 },
  header: { fontSize: 18, fontWeight: "700", color: "#111827" },
  field: { gap: 6 },
  label: { fontSize: 13, color: "#6b7280" },
  input: { borderWidth: StyleSheet.hairlineWidth, borderColor: "#e5e7eb", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 10, fontSize: 14, color: "#111827" },
  row: { flexDirection: "row", gap: 10 },
  flex1: { flex: 1 },
  actions: { flexDirection: "row", justifyContent: "flex-end", gap: 10, marginTop: 8 },
  button: { borderRadius: 8, paddingHorizontal: 16, paddingVertical: 10 },
  buttonGhost: { backgroundColor: "#f3f4f6" },
  buttonGhostText: { color: "#111827" },
  buttonPrimary: { backgroundColor: "#2563eb" },
  buttonDisabled: { backgroundColor: "#e5e7eb" },
  buttonText: { fontSize: 14, fontWeight: "600" },
  buttonPrimaryText: { color: "#ffffff" },
});


