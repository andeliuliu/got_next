import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Search, MessageCircle, UserPlus, Users, MessageSquare } from "lucide-react";

interface Friend {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'playing';
  lastSeen?: string;
  currentGame?: string;
}

interface GameChat {
  id: string;
  gameName: string;
  participants: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  lastMessage: {
    text: string;
    sender: string;
    timestamp: string;
  };
  unreadCount: number;
}

const mockFriends: Friend[] = [
  {
    id: '1',
    name: 'Alex Rodriguez',
    status: 'playing',
    currentGame: 'Friday Night Hoops'
  },
  {
    id: '2',
    name: 'Maya Patel',
    status: 'online'
  },
  {
    id: '3',
    name: 'Chris Johnson',
    status: 'offline',
    lastSeen: '2h ago'
  },
  {
    id: '4',
    name: 'Sarah Chen',
    status: 'online'
  },
  {
    id: '5',
    name: 'Marcus Davis',
    status: 'playing',
    currentGame: 'Weekend Pickup'
  }
];

const mockGameChats: GameChat[] = [
  {
    id: '1',
    gameName: 'Friday Night Hoops',
    participants: [
      { id: '1', name: 'Alex Rodriguez' },
      { id: '2', name: 'Maya Patel' },
      { id: '3', name: 'Chris Johnson' }
    ],
    lastMessage: {
      text: 'See you all at 7! Court looks good 🏀',
      sender: 'Alex Rodriguez',
      timestamp: '5 min ago'
    },
    unreadCount: 2
  },
  {
    id: '2',
    gameName: 'Weekend Pickup',
    participants: [
      { id: '4', name: 'Sarah Chen' },
      { id: '5', name: 'Marcus Davis' }
    ],
    lastMessage: {
      text: 'Should we move it to 3pm instead?',
      sender: 'Marcus Davis',
      timestamp: '1h ago'
    },
    unreadCount: 0
  }
];

export function SocialTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('friends');

  const filteredFriends = mockFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'playing':
        return 'bg-blue-500';
      case 'offline':
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = (friend: Friend) => {
    switch (friend.status) {
      case 'online':
        return 'Online';
      case 'playing':
        return `Playing: ${friend.currentGame}`;
      case 'offline':
        return `Last seen ${friend.lastSeen}`;
      default:
        return 'Offline';
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search friends and messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="friends" className="gap-2">
            <Users className="h-4 w-4" />
            Friends
          </TabsTrigger>
          <TabsTrigger value="messages" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Messages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="friends" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Your Basketball Crew</h3>
            <Button variant="outline" size="sm" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Friend
            </Button>
          </div>

          <div className="space-y-3">
            {filteredFriends.map((friend) => (
              <Card key={friend.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>
                            {friend.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(friend.status)}`} />
                      </div>
                      <div>
                        <p className="font-medium">{friend.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {getStatusText(friend)}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Game Chats</h3>
            <Badge variant="secondary">
              {mockGameChats.reduce((sum, chat) => sum + chat.unreadCount, 0)} unread
            </Badge>
          </div>

          <div className="space-y-3">
            {mockGameChats.map((chat) => (
              <Card key={chat.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {chat.participants.slice(0, 3).map((participant) => (
                        <Avatar key={participant.id} className="h-10 w-10 border-2 border-background">
                          <AvatarImage src={participant.avatar} alt={participant.name} />
                          <AvatarFallback className="text-xs">
                            {participant.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {chat.participants.length > 3 && (
                        <div className="h-10 w-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                          +{chat.participants.length - 3}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium truncate">{chat.gameName}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {chat.lastMessage.timestamp}
                          </span>
                          {chat.unreadCount > 0 && (
                            <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                              {chat.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        <span className="font-medium">{chat.lastMessage.sender}:</span> {chat.lastMessage.text}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-dashed">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Messages appear here when you join games
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}