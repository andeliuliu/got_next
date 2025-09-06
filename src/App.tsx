import { useState } from "react";
import { Header } from "./components/header";
import { BottomNavigation } from "./components/bottom-navigation";
import { QuickActions } from "./components/quick-actions";
import { GameCard } from "./components/game-card";
import { ActivityFeed } from "./components/activity-feed";
import { QuickGameCreate } from "./components/quick-game-create";
import { GameCreationFlow } from "./components/game-creation-flow";
import { SocialTab } from "./components/social-tab";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";

// Mock data for games
const upcomingGames = [
  {
    id: '1',
    title: 'Friday Night Hoops',
    date: 'Today',
    time: '7:00 PM',
    location: 'Riverside Park Basketball Court',
    participants: [
      { id: '1', name: 'Alex Rodriguez' },
      { id: '2', name: 'Jordan Smith' },
      { id: '3', name: 'Maya Patel' },
      { id: '4', name: 'Chris Johnson' },
      { id: '5', name: 'Sarah Chen' }
    ],
    maxPlayers: 10,
    status: 'upcoming' as const,
    isJoined: true
  },
  {
    id: '2',
    title: 'Weekend Pickup',
    date: 'Tomorrow',
    time: '2:00 PM',
    location: 'Central Park Courts',
    participants: [
      { id: '6', name: 'Marcus Davis' },
      { id: '7', name: 'Lisa Wang' },
      { id: '8', name: 'Tyler Brown' }
    ],
    maxPlayers: 8,
    status: 'upcoming' as const,
    isJoined: false
  },
  {
    id: '3',
    title: 'Morning Shootaround',
    date: 'Sunday',
    time: '9:00 AM',
    location: 'Oak Street Recreation Center',
    participants: [
      { id: '9', name: 'David Lee' },
      { id: '10', name: 'Emma Wilson' },
      { id: '11', name: 'Jake Miller' },
      { id: '12', name: 'Rachel Green' },
      { id: '13', name: 'Tom Anderson' },
      { id: '14', name: 'Nina Roberts' }
    ],
    maxPlayers: 12,
    status: 'upcoming' as const,
    isJoined: false
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [showGameCreation, setShowGameCreation] = useState(false);
  const [games, setGames] = useState(upcomingGames);

  const handleQuickGameCreate = (groupId: string, time: string) => {
    // Mock creating a quick game
    const newGame = {
      id: `quick-${Date.now()}`,
      title: `Quick Game - Group ${groupId}`,
      date: time.includes('Today') ? 'Today' : 'Tomorrow',
      time: time.split(' ').pop() || '7:00 PM',
      location: 'Riverside Park Basketball Court',
      participants: [
        { id: '1', name: 'Alex Rodriguez' },
        { id: '2', name: 'Maya Patel' },
        { id: '3', name: 'Chris Johnson' }
      ],
      maxPlayers: 10,
      status: 'upcoming' as const,
      isJoined: true
    };
    
    setGames(prev => [newGame, ...prev]);
    toast(`Game scheduled for ${time}! Invites sent to your group.`);
  };

  const handleGameCreationComplete = (gameData: any) => {
    // Mock creating a full game
    const newGame = {
      id: `game-${Date.now()}`,
      title: gameData.title,
      date: gameData.date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: gameData.time,
      location: gameData.location,
      participants: gameData.friends.filter((f: any) => f.isSelected).map((f: any) => ({
        id: f.id,
        name: f.name
      })),
      maxPlayers: gameData.maxPlayers,
      status: 'upcoming' as const,
      isJoined: true
    };
    
    setGames(prev => [newGame, ...prev]);
    toast(`Game "${gameData.title}" created! Invites sent to ${gameData.friends.filter((f: any) => f.isSelected).length} friends.`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <div className="space-y-6">
            <ActivityFeed />
          </div>
        );
      
      case 'games':
        return (
          <div className="space-y-6">
            <QuickGameCreate 
              onCreateGame={handleQuickGameCreate}
              onCreateNewGroup={() => setShowGameCreation(true)}
            />
            
            <QuickActions 
              onCreateNewGame={() => setShowGameCreation(true)}
            />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-medium">Upcoming Games</h2>
                <button className="text-sm text-primary">View All</button>
              </div>
              <div className="space-y-3">
                {games.map((game) => (
                  <GameCard key={game.id} {...game} />
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'social':
        return <SocialTab />;
      
      case 'profile':
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-2">
              <h3 className="font-medium">Profile</h3>
              <p className="text-sm text-muted-foreground">Your stats and settings</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'feed':
        return 'Basketball Feed';
      case 'games':
        return 'Games';
      case 'social':
        return 'Social';
      case 'profile':
        return 'Profile';
      default:
        return 'Pickup Basketball';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        title={getPageTitle()}
        showSearch={activeTab === 'social' || activeTab === 'games'}
        showNotifications={activeTab === 'feed'}
        showProfile={activeTab === 'feed'}
        userName="Jordan Smith"
      />
      
      <main className="px-4 py-6">
        {renderContent()}
      </main>
      
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <GameCreationFlow
        isOpen={showGameCreation}
        onClose={() => setShowGameCreation(false)}
        onComplete={handleGameCreationComplete}
      />
      
      <Toaster />
    </div>
  );
}