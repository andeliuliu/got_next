import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { groupsSeed, locationsSeed } from "../mocks/groups";
import { GameCreationData } from "../types/game";

interface GameCreationFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (game: GameCreationData) => void;
}

export function GameCreationFlow({ isOpen, onClose, onComplete }: GameCreationFlowProps) {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(groupsSeed[0]?.id ?? null);
  const [showGroupMenu, setShowGroupMenu] = useState(false);
  const [location, setLocation] = useState(locationsSeed[0] ?? "");
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const times = useMemo(() => {
    const labels: string[] = [];
    for (let h = 8; h <= 23; h++) {
      const hour12 = ((h + 11) % 12) + 1;
      const period = h >= 12 ? "pm" : "am";
      labels.push(`${hour12}:00 ${period}`);
      labels.push(`${hour12}:30 ${period}`);
    }
    labels.push("12:00 am");
    return labels;
  }, []);
  function labelToMinutes(label: string): number {
    const [time, meridiem] = label.split(" ");
    const [hStr, mStr] = time.split(":");
    let h = parseInt(hStr, 10) % 12;
    const m = parseInt(mStr, 10);
    if (meridiem.toLowerCase() === "pm") h += 12;
    if (label.toLowerCase() === "12:00 am") return 24 * 60; // represent as 1440 to keep order
    return h * 60 + m;
  }

  function getNearestSlotNow(labels: string[]): string {
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    let best = labels[0];
    let bestDiff = Infinity;
    for (const lbl of labels) {
      const mins = labelToMinutes(lbl);
      // Map 1440 back to 0 for diff comparisons too
      const candidate = mins === 1440 ? 0 : mins;
      const diff = Math.abs(candidate - nowMinutes);
      if (diff < bestDiff) {
        best = lbl;
        bestDiff = diff;
      }
    }
    return best;
  }

  const [startTime, setStartTime] = useState<string>("8:00 am");
  const [endTime, setEndTime] = useState<string>("8:00 am");
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showEndMenu, setShowEndMenu] = useState(false);
  const startListRef = useRef<ScrollView | null>(null);
  const endListRef = useRef<ScrollView | null>(null);
  const ITEM_HEIGHT = 40;
  const [description, setDescription] = useState<string>("");

  const canSubmit = useMemo(() => location.trim().length > 0, [location]);

  useEffect(() => {
    if (isOpen) {
      const slot = getNearestSlotNow(times);
      setStartTime(slot);
      setEndTime(slot);
    }
  }, [isOpen, times]);

  useEffect(() => {
    if (showStartMenu) {
      const idx = times.findIndex((t) => t === startTime);
      if (idx >= 0) {
        const y = Math.max(0, idx * ITEM_HEIGHT - ITEM_HEIGHT * 2);
        startListRef.current?.scrollTo({ y, animated: false });
      }
    }
  }, [showStartMenu, startTime, times]);

  useEffect(() => {
    if (showEndMenu) {
      const idx = times.findIndex((t) => t === endTime);
      if (idx >= 0) {
        const y = Math.max(0, idx * ITEM_HEIGHT - ITEM_HEIGHT * 2);
        endListRef.current?.scrollTo({ y, animated: false });
      }
    }
  }, [showEndMenu, endTime, times]);

  const toggleMenu = useCallback((menu: "group" | "location" | "calendar" | "start" | "end") => {
    const next =
      menu === "group" ? !showGroupMenu :
      menu === "location" ? !showLocationMenu :
      menu === "calendar" ? !showCalendar :
      menu === "start" ? !showStartMenu :
      !showEndMenu;

    setShowGroupMenu(menu === "group" ? next : false);
    setShowLocationMenu(menu === "location" ? next : false);
    setShowCalendar(menu === "calendar" ? next : false);
    setShowStartMenu(menu === "start" ? next : false);
    setShowEndMenu(menu === "end" ? next : false);
  }, [showGroupMenu, showLocationMenu, showCalendar, showStartMenu, showEndMenu]);

  return (
    <Modal visible={isOpen} onRequestClose={onClose} animationType="fade" transparent>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={[styles.header, { marginTop: 4 }]}>Create Game</Text>

        

        <View style={[styles.field, showGroupMenu ? styles.fieldRaised : undefined]}>
          <Text style={styles.label}>Group</Text>
          <Pressable style={styles.input} onPress={() => toggleMenu("group")}>
            <Text style={{ color: "#111827" }}>
              {groupsSeed.find((g) => g.id === selectedGroupId)?.name || "Select group"}
            </Text>
          </Pressable>
          {showGroupMenu && (
            <View style={styles.menu}>
              {groupsSeed.map((g) => (
                <Pressable key={g.id} style={styles.menuItem} onPress={() => { setSelectedGroupId(g.id); setShowGroupMenu(false); }}>
                  <Text style={styles.menuItemText}>{g.name}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View style={[styles.field, showLocationMenu ? styles.fieldRaised : undefined]}>
          <Text style={styles.label}>Location</Text>
          <Pressable style={styles.input} onPress={() => toggleMenu("location")}>
            <Text style={{ color: "#111827" }}>{location || "Select location"}</Text>
          </Pressable>
          {showLocationMenu && (
            <View style={styles.menu}>
              {locationsSeed.map((loc) => (
                <Pressable key={loc} style={styles.menuItem} onPress={() => { setLocation(loc); setShowLocationMenu(false); }}>
                  <Text style={styles.menuItemText}>{loc}</Text>
                </Pressable>
              ))}
              <Pressable style={[styles.menuItem, styles.addNew]} onPress={() => { setShowLocationMenu(false); /* open add new later */ }}>
                <Text style={[styles.menuItemText, { color: "#2563eb" }]}>+ Add new location</Text>
              </Pressable>
            </View>
          )}
        </View>

        <View style={[styles.field, showCalendar ? styles.fieldRaised : undefined]}>
          <Text style={styles.label}>Date</Text>
          <Pressable style={styles.input} onPress={() => toggleMenu("calendar")}>
            <Text style={{ color: "#111827" }}>
              {selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
            </Text>
          </Pressable>
          {showCalendar && (
            <View style={styles.calendarContainer}>
              <View style={styles.calendarHeader}>
                <Pressable style={styles.navBtn} onPress={() => setCalendarMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}>
                  <Text style={styles.navBtnText}>◀</Text>
                </Pressable>
                <Text style={styles.monthLabel}>
                  {calendarMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </Text>
                <Pressable style={styles.navBtn} onPress={() => setCalendarMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}>
                  <Text style={styles.navBtnText}>▶</Text>
                </Pressable>
              </View>
              <View style={styles.weekRow}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <Text key={d} style={styles.weekLabel}>{d}</Text>
                ))}
              </View>
              <View style={styles.daysGrid}>
                {(() => {
                  const firstDayIdx = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay();
                  const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
                  const cells: Array<{ key: string; day?: number }> = [];
                  for (let i = 0; i < firstDayIdx; i++) cells.push({ key: `e-${i}` });
                  for (let d = 1; d <= daysInMonth; d++) cells.push({ key: `d-${d}`, day: d });
              return cells.map(({ key, day }) => {
                if (!day) return <View key={key} style={styles.dayCell} />;
                const cellDate = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
                const isSelected = selectedDate.toDateString() === cellDate.toDateString();
                return (
                  <Pressable
                    key={key}
                    style={styles.dayCell}
                    onPress={() => { setSelectedDate(cellDate); setShowCalendar(false); }}
                  >
                    <View style={[styles.dayInner, isSelected ? styles.dayInnerSelected : undefined]}>
                      <Text style={[styles.dayText, isSelected ? styles.dayTextSelected : undefined]}>{day}</Text>
                    </View>
                  </Pressable>
                );
              });
                })()}
              </View>
            </View>
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={[styles.field, styles.flex1, showStartMenu ? styles.fieldRaised : undefined]}>
            <Text style={styles.label}>Start time</Text>
            <Pressable style={styles.input} onPress={() => toggleMenu("start")}>
              <Text style={{ color: "#111827" }}>{startTime}</Text>
            </Pressable>
            {showStartMenu && (
              <View style={[styles.menu, { maxHeight: 200 }]}> 
                <ScrollView ref={startListRef}>
                  {times.map((t) => (
                    <Pressable key={`s-${t}`} style={styles.menuItem} onPress={() => { setStartTime(t); setEndTime(t); setShowStartMenu(false); }}>
                      <Text style={[styles.menuItemText, startTime === t ? styles.menuItemTextActive : undefined]}>{t}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          <View style={[styles.field, styles.flex1, showEndMenu ? styles.fieldRaised : undefined]}>
            <Text style={styles.label}>End time</Text>
            <Pressable style={styles.input} onPress={() => toggleMenu("end")}>
              <Text style={{ color: "#111827" }}>{endTime}</Text>
            </Pressable>
            {showEndMenu && (
              <View style={[styles.menu, { maxHeight: 200 }]}> 
                <ScrollView ref={endListRef}>
                  {times.map((t) => (
                    <Pressable key={`e-${t}`} style={styles.menuItem} onPress={() => { setEndTime(t); setShowEndMenu(false); }}>
                      <Text style={[styles.menuItemText, endTime === t ? styles.menuItemTextActive : undefined]}>{t}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Description (optional)</Text>
          <TextInput
            style={[styles.input, { minHeight: 80, textAlignVertical: "top" }]}
            placeholder="Add a note for friends..."
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>

            <View style={[styles.actions, { justifyContent: "center", marginTop: 16 }]}>
              <Pressable style={[styles.button, styles.buttonGhost]} onPress={onClose}>
                <Text style={[styles.buttonText, styles.buttonGhostText]}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, canSubmit ? styles.buttonPrimary : styles.buttonDisabled]}
                disabled={!canSubmit}
                onPress={() => {
                  const groupName = groupsSeed.find((g) => g.id === selectedGroupId)?.name;
                  const computedTitle = groupName ? `${groupName} Pickup` : `Pickup at ${location}`;
                  onComplete({
                    title: computedTitle,
                    location,
                    startTime,
                    endTime,
                    dateISO: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()).toISOString(),
                    groupId: selectedGroupId ?? undefined,
                    description: description.trim() || undefined,
                  });
                  onClose();
                  setSelectedGroupId(groupsSeed[0]?.id ?? null);
                  setLocation(locationsSeed[0] ?? "");
                  setDescription("");
                }}
              >
                <Text style={[styles.buttonText, styles.buttonPrimaryText]}>Create</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center", padding: 16 },
  card: { width: "100%", maxWidth: 420, maxHeight: "85%", backgroundColor: "#ffffff", borderRadius: 12, overflow: "visible" },
  cardContent: { padding: 20, gap: 12 },
  container: { flex: 1, backgroundColor: "#ffffff", padding: 16, gap: 12 },
  header: { fontSize: 18, fontWeight: "700", color: "#111827" },
  field: { gap: 6, position: "relative" },
  fieldRaised: { zIndex: 1000, elevation: 10 },
  label: { fontSize: 13, color: "#6b7280" },
  input: { borderWidth: StyleSheet.hairlineWidth, borderColor: "#e5e7eb", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 10, fontSize: 14, color: "#374151", backgroundColor: "#f3f4f6" },
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
  menu: { position: "absolute", top: "100%", left: 0, right: 0, marginTop: 4, borderWidth: StyleSheet.hairlineWidth, borderColor: "#e5e7eb", borderRadius: 8, backgroundColor: "#ffffff", maxHeight: 240, zIndex: 1000, elevation: 10, shadowColor: "#000000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 8 },
  menuItem: { paddingHorizontal: 10, paddingVertical: 10 },
  menuItemText: { color: "#111827", fontSize: 14, marginHorizontal: 4 },
  menuItemTextActive: { color: "#1d4ed8", fontWeight: "600" },
  addNew: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: "#e5e7eb" },
  divider: { height: 1, backgroundColor: "#e5e7eb", marginVertical: 8 },
  calendarContainer: { position: "absolute", top: "100%", left: 0, right: 0, marginTop: 4, borderWidth: StyleSheet.hairlineWidth, borderColor: "#e5e7eb", borderRadius: 8, padding: 10, backgroundColor: "#ffffff", gap: 8, zIndex: 1000, elevation: 10, shadowColor: "#000000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 8 },
  calendarHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  navBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, backgroundColor: "#f3f4f6" },
  navBtnText: { color: "#111827", fontSize: 12, fontWeight: "600" },
  monthLabel: { color: "#111827", fontSize: 14, fontWeight: "600" },
  weekRow: { flexDirection: "row", justifyContent: "space-between" },
  weekLabel: { width: `${100 / 7}%`, textAlign: "center", color: "#6b7280", fontSize: 12 },
  daysGrid: { flexDirection: "row", flexWrap: "wrap" },
  dayCell: { width: `${100 / 7}%`, aspectRatio: 1, alignItems: "center", justifyContent: "center" },
  dayInner: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  dayInnerSelected: { backgroundColor: "#dbeafe" },
  dayText: { color: "#111827", fontSize: 14 },
  dayTextSelected: { color: "#1d4ed8", fontWeight: "700" },
});


