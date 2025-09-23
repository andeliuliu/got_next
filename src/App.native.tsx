import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getGameRepository } from "./api";
import { ActivityFeed } from "./components/activity-feed.native";
import { BottomNavigation } from "./components/bottom-navigation.native";
import { GameCard } from "./components/game-card.native";
import { GameCreationFlow } from "./components/game-creation-flow.native";
import { GroupCreationFlow } from "./components/group-creation-flow.native";
import { Header } from "./components/header.native";
import { QuickActions } from "./components/quick-actions.native";
import { SocialTab } from "./components/social-tab.native";
import { Game, GameCreationData } from "./types/game";
import { TabId } from "./types/navigation";

 

 

export default function AppNative() {
  const [activeTab, setActiveTab] = useState<TabId>("feed");
  const [showGameCreation, setShowGameCreation] = useState(false);
  const [showGroupCreation, setShowGroupCreation] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [gamesTab, setGamesTab] = useState<"upcoming" | "recent">("upcoming");

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
  const upcomingGames = useMemo(() => games.filter((g) => g.startISO ? new Date(g.startISO) >= now : true), [games, now]);
  const recentGames = useMemo(() => games.filter((g) => g.startISO ? new Date(g.startISO) < now : false), [games, now]);

  return (
    <SafeAreaView style={styles.rootSafeArea}>
      <View style={styles.root}>
        <Header title={pageTitle} showNotifications={activeTab === "feed"} />
        {activeTab === "games" ? (
          <FlatList
            data={gamesTab === "upcoming" ? upcomingGames : recentGames}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <GameCard {...item} />}
            contentContainerStyle={styles.contentScroll}
            ListHeaderComponent={
              <View>
                <View style={styles.tabsRow}>
                  <Pressable style={[styles.tabButton, gamesTab === "upcoming" ? styles.tabButtonActive : undefined]} onPress={() => setGamesTab("upcoming")}>
                    <Text style={[styles.tabLabel, gamesTab === "upcoming" ? styles.tabLabelActive : undefined]}>Upcoming</Text>
                  </Pressable>
                  <Pressable style={[styles.tabButton, gamesTab === "recent" ? styles.tabButtonActive : undefined]} onPress={() => setGamesTab("recent")}>
                    <Text style={[styles.tabLabel, gamesTab === "recent" ? styles.tabLabelActive : undefined]}>Recent</Text>
                  </Pressable>
                </View>
                <View style={{ height: 8 }} />
                <QuickActions onCreateNewGroup={() => setShowGroupCreation(true)} onCreateNewGame={handleOpenGameCreation} />
                <View style={{ height: 8 }} />
                <Text style={styles.sectionTitle}>{gamesTab === "upcoming" ? "Upcoming Games" : "Most Recent Games"}</Text>
              </View>
            }
          />
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

        <GroupCreationFlow
          isOpen={showGroupCreation}
          onClose={() => setShowGroupCreation(false)}
          onComplete={() => setShowGroupCreation(false)}
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
  tabsRow: { flexDirection: "row", gap: 8 },
  tabButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: "#f3f4f6" },
  tabButtonActive: { backgroundColor: "#dbeafe" },
  tabLabel: { fontSize: 13, color: "#6b7280", fontWeight: "600" },
  tabLabelActive: { color: "#1d4ed8" },
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


