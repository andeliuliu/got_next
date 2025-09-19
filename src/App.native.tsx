import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getGameRepository } from "./api";
import { ActivityFeed } from "./components/activity-feed.native";
import { BottomNavigation } from "./components/bottom-navigation.native";
import { GameCard } from "./components/game-card.native";
import { GameCreationFlow } from "./components/game-creation-flow.native";
import { Header } from "./components/header.native";
import { QuickActions } from "./components/quick-actions.native";
import { SocialTab } from "./components/social-tab.native";
import { Game, GameCreationData } from "./types/game";
import { TabId } from "./types/navigation";

 

 

export default function AppNative() {
  const [activeTab, setActiveTab] = useState<TabId>("feed");
  const [showGameCreation, setShowGameCreation] = useState(false);
  const [games, setGames] = useState<Game[]>([]);

  const repo = useMemo(() => getGameRepository(), []);

  useEffect(() => {
    let isMounted = true;
    repo.listGames().then((list) => {
      if (isMounted) setGames(list);
    });
    return () => {
      isMounted = false;
    };
  }, [repo]);

  const pageTitle = useMemo(() => {
    switch (activeTab) {
      case "feed":
        return "Basketball Feed";
      case "games":
        return "Games";
      case "friends":
        return "Friends";
      case "profile":
        return "Profile";
      default:
        return "Pickup Basketball";
    }
  }, [activeTab]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab as TabId);
  }, [setActiveTab]);

  const handleOpenGameCreation = useCallback(() => {
    setShowGameCreation(true);
  }, [setShowGameCreation]);

  const handleCloseGameCreation = useCallback(() => {
    setShowGameCreation(false);
  }, [setShowGameCreation]);

  const handleCreateQuickGame = useCallback(async (groupId: string, time: string) => {
    const created = await repo.createQuickGame(groupId, time);
    setGames((prev) => [created, ...prev]);
  }, [repo]);

  const handleGameCreationComplete = useCallback(async (gameData: GameCreationData) => {
    const created = await repo.createGame(gameData);
    setGames((prev) => [created, ...prev]);
  }, [repo]);

  const now = new Date();
  const upcomingGames = useMemo(() => games.filter((g) => new Date(g.startISO) >= now), [games, now]);
  const recentGames = useMemo(() => games.filter((g) => new Date(g.startISO) < now), [games, now]);

  return (
    <SafeAreaView style={styles.rootSafeArea}>
      <View style={styles.root}>
        <Header title={pageTitle} showNotifications={activeTab === "feed"} />
        {activeTab === "games" ? (
          <View style={styles.gamesPage}>
            <View style={styles.sectionTop}>
              <Text style={styles.sectionTitle}>Upcoming Games</Text>
              <FlatList
                data={upcomingGames}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <GameCard {...item} />}
                contentContainerStyle={upcomingGames.length === 0 ? styles.emptyListContent : styles.sectionListContent}
                style={{ flex: 1 }}
                ListEmptyComponent={
                  <View style={styles.emptyState}> 
                    <Text style={styles.emptyText}>No upcoming games, gotta run it up!</Text>
                  </View>
                }
              />
            </View>

            <View style={styles.sectionMiddle}>
              <QuickActions onCreateNewGroup={handleOpenGameCreation} onCreateNewGame={handleOpenGameCreation} />
            </View>

            <View style={styles.sectionBottom}>
              <Text style={styles.sectionTitle}>Most Recent Games</Text>
              <FlatList
                data={recentGames}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={{ marginBottom: 10, borderWidth: StyleSheet.hairlineWidth, borderColor: "#e5e7eb", borderRadius: 10, padding: 12, backgroundColor: "#ffffff" }}>
                    <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827", marginBottom: 6 }}>{item.title}</Text>
                    <Text style={{ fontSize: 13, color: "#6b7280" }}>{item.time}</Text>
                    <Text style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>{item.location}</Text>
                  </View>
                )}
                contentContainerStyle={styles.sectionListContent}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.contentScroll}>
            {activeTab === "feed" && <ActivityFeed />}
            {activeTab === "friends" && <SocialTab />}
            {activeTab === "profile" && (
              <View style={styles.centeredBox}>
                <Text style={styles.heading}>Profile</Text>
                <Text style={styles.mutedText}>Your stats and settings.</Text>
              </View>
            )}
          </ScrollView>
        )}

        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />

        <GameCreationFlow
          isOpen={showGameCreation}
          onClose={handleCloseGameCreation}
          onComplete={handleGameCreationComplete}
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
  contentScroll: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 88,
  },
  gamesPage: { flex: 1 },
  sectionTop: { flex: 42, paddingHorizontal: 16, paddingTop: 16 },
  sectionMiddle: { flex: 16, paddingHorizontal: 16, justifyContent: "center" },
  sectionBottom: { flex: 42, paddingHorizontal: 16, paddingBottom: 16 },
  sectionListContent: { paddingBottom: 8 },
  emptyListContent: { flexGrow: 1, justifyContent: "center" },
  emptyState: { alignItems: "center", justifyContent: "center", paddingVertical: 16 },
  emptyText: { color: "#6b7280", fontSize: 14, textAlign: "center" },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#e5e7eb",
    marginBottom: 12,
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
});


