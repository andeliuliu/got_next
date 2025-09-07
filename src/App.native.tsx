import React, { useMemo, useState } from "react";
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from "react-native";
import { Header } from "./components/header.native";
import { BottomNavigation } from "./components/bottom-navigation.native";
import { ActivityFeed } from "./components/activity-feed.native";
import { QuickActions } from "./components/quick-actions.native";
import { QuickGameCreate } from "./components/quick-game-create.native";
import { GameCard } from "./components/game-card.native";
import { SocialTab } from "./components/social-tab.native";
import { GameCreationFlow } from "./components/game-creation-flow.native";

type Participant = {
  id: string;
  name: string;
};

type Game = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: Participant[];
  maxPlayers: number;
  status: "upcoming";
  isJoined: boolean;
};

const upcomingGamesSeed: Game[] = [
  {
    id: "1",
    title: "Friday Night Hoops",
    date: "Today",
    time: "7:00 PM",
    location: "Riverside Park Basketball Court",
    participants: [
      { id: "1", name: "Alex Rodriguez" },
      { id: "2", name: "Jordan Smith" },
      { id: "3", name: "Maya Patel" },
      { id: "4", name: "Chris Johnson" },
      { id: "5", name: "Sarah Chen" },
    ],
    maxPlayers: 10,
    status: "upcoming",
    isJoined: true,
  },
  {
    id: "2",
    title: "Weekend Pickup",
    date: "Tomorrow",
    time: "2:00 PM",
    location: "Central Park Courts",
    participants: [
      { id: "6", name: "Marcus Davis" },
      { id: "7", name: "Lisa Wang" },
      { id: "8", name: "Tyler Brown" },
    ],
    maxPlayers: 8,
    status: "upcoming",
    isJoined: false,
  },
  {
    id: "3",
    title: "Morning Shootaround",
    date: "Sunday",
    time: "9:00 AM",
    location: "Oak Street Recreation Center",
    participants: [
      { id: "9", name: "David Lee" },
      { id: "10", name: "Emma Wilson" },
      { id: "11", name: "Jake Miller" },
      { id: "12", name: "Rachel Green" },
      { id: "13", name: "Tom Anderson" },
      { id: "14", name: "Nina Roberts" },
    ],
    maxPlayers: 12,
    status: "upcoming",
    isJoined: false,
  },
];

type TabId = "feed" | "games" | "social" | "profile";

export default function AppNative() {
  const [activeTab, setActiveTab] = useState<TabId>("feed");
  const [showGameCreation, setShowGameCreation] = useState(false);
  const [games, setGames] = useState<Game[]>(upcomingGamesSeed);

  const pageTitle = useMemo(() => {
    switch (activeTab) {
      case "feed":
        return "Basketball Feed";
      case "games":
        return "Games";
      case "social":
        return "Social";
      case "profile":
        return "Profile";
      default:
        return "Pickup Basketball";
    }
  }, [activeTab]);

  return (
    <SafeAreaView style={styles.rootSafeArea}>
      <View style={styles.root}>
        <Header title={pageTitle} showNotifications={activeTab === "feed"} />
        <ScrollView contentContainerStyle={styles.contentScroll}>
          {activeTab === "feed" && <ActivityFeed />}

          {activeTab === "games" && (
            <View style={styles.section}>
              <QuickGameCreate
                onCreateGame={(groupId, time) => {
                  const newGame: Game = {
                    id: `quick-${Date.now()}`,
                    title: `Quick Game - Group ${groupId}`,
                    date: time.includes("Today") ? "Today" : "Tomorrow",
                    time,
                    location: "Riverside Park Basketball Court",
                    participants: [
                      { id: "1", name: "Alex Rodriguez" },
                      { id: "2", name: "Maya Patel" },
                      { id: "3", name: "Chris Johnson" },
                    ],
                    maxPlayers: 10,
                    status: "upcoming",
                    isJoined: true,
                  };
                  setGames((prev) => [newGame, ...prev]);
                }}
                onCreateNewGroup={() => setShowGameCreation(true)}
              />

              <View style={{ height: 8 }} />
              <QuickActions onCreateNewGame={() => setShowGameCreation(true)} />

              <View style={{ height: 8 }} />
              <Text style={styles.sectionTitle}>Upcoming Games</Text>
              {games.map((game) => (
                <GameCard key={game.id} {...game} />
              ))}
            </View>
          )}

          {activeTab === "social" && <SocialTab />}

          {activeTab === "profile" && (
            <View style={styles.centeredBox}>
              <Text style={styles.heading}>Profile</Text>
              <Text style={styles.mutedText}>Your stats and settings.</Text>
            </View>
          )}
        </ScrollView>

        <BottomNavigation activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as TabId)} />

        <GameCreationFlow
          isOpen={showGameCreation}
          onClose={() => setShowGameCreation(false)}
          onComplete={(gameData: any) => {
            const newGame: Game = {
              id: `game-${Date.now()}`,
              title: gameData.title,
              date: new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
              time: gameData.time,
              location: gameData.location,
              participants: [],
              maxPlayers: gameData.maxPlayers,
              status: "upcoming",
              isJoined: true,
            };
            setGames((prev) => [newGame, ...prev]);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootSafeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  root: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  contentScroll: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 88,
  },
  centeredBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  mutedText: {
    fontSize: 14,
    color: "#6b7280",
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#ffffff",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  pillJoined: {
    backgroundColor: "#dbeafe",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  pillJoinedText: {
    color: "#1d4ed8",
    fontSize: 12,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  metaText: {
    fontSize: 13,
    color: "#6b7280",
  },
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e5e7eb",
    paddingHorizontal: 8,
    paddingTop: 6,
    paddingBottom: 10,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 11,
    color: "#6b7280",
    marginTop: 2,
  },
  tabLabelActive: {
    color: "#2563eb",
    fontWeight: "600",
  },
});


