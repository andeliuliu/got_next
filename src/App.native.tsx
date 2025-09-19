import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { getGameRepository } from "./api";
import { ActivityFeed } from "./components/activity-feed.native";
import { BottomNavigation } from "./components/bottom-navigation.native";
import { GameCard } from "./components/game-card.native";
import { GameCreationFlow } from "./components/game-creation-flow.native";
import { Header } from "./components/header.native";
import { QuickActions } from "./components/quick-actions.native";
import { QuickGameCreate } from "./components/quick-game-create.native";
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
      case "social":
        return "Social";
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

  return (
    <SafeAreaView style={styles.rootSafeArea}>
      <View style={styles.root}>
        <Header title={pageTitle} showNotifications={activeTab === "feed"} />
        {activeTab === "games" ? (
          <FlatList
            data={games}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.contentScroll}
            ListHeaderComponent={
              <View>
                <QuickGameCreate
                  onCreateGame={handleCreateQuickGame}
                  onCreateNewGroup={handleOpenGameCreation}
                />
                <View style={{ height: 8 }} />
                <QuickActions onCreateNewGame={handleOpenGameCreation} />
                <View style={{ height: 8 }} />
                <Text style={styles.sectionTitle}>Upcoming Games</Text>
              </View>
            }
            renderItem={({ item }) => <GameCard {...item} />}
          />
        ) : (
          <ScrollView contentContainerStyle={styles.contentScroll}>
            {activeTab === "feed" && <ActivityFeed />}
            {activeTab === "social" && <SocialTab />}
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


