import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Heart, MessageCircle, Share2, Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface FeedItem {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  type: 'highlight' | 'photo' | 'game_result';
  content: {
    text?: string;
    image?: string;
    video?: boolean;
  };
  timestamp: string;
  likes: number;
  comments: number;
  gameInfo?: {
    location: string;
    score: string;
  };
}

const mockFeedData: FeedItem[] = [
  {
    id: '1',
    user: { name: 'Marcus Johnson', avatar: undefined },
    type: 'highlight',
    content: { 
      text: 'Crazy buzzer beater at Riverside Park! 🏀🔥',
      image: 'https://images.unsplash.com/photo-1705594858888-90d164689257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwcGxheWVycyUyMGFjdGlvbnxlbnwxfHx8fDE3NTcxNzc2NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      video: true 
    },
    timestamp: '2h ago',
    likes: 24,
    comments: 8,
    gameInfo: { location: 'Riverside Park', score: '21-19' }
  },
  {
    id: '2',
    user: { name: 'Sarah Chen' },
    type: 'photo',
    content: { 
      text: 'Post-game vibes with the squad! Great run today 💪',
      image: 'https://images.unsplash.com/photo-1709552899537-8f0a171aaf40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBvdXRkb29yfGVufDF8fHx8MTc1NzA5MjczNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    timestamp: '4h ago',
    likes: 18,
    comments: 5
  }
];

export function ActivityFeed() {
  return (
    <div className="space-y-4">
      <h2 className="font-medium">Recent Activity</h2>
      <div className="space-y-4">
        {mockFeedData.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={item.user.avatar} alt={item.user.name} />
                    <AvatarFallback>
                      {item.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{item.user.name}</p>
                    <p className="text-sm text-muted-foreground">{item.timestamp}</p>
                  </div>
                </div>
                {item.type === 'highlight' && (
                  <Badge variant="secondary">Highlight</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {item.content.text && (
                <p className="text-sm">{item.content.text}</p>
              )}
              
              {item.content.image && (
                <div className="relative rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={item.content.image}
                    alt="Activity post"
                    className="w-full h-48 object-cover"
                  />
                  {item.content.video && (
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <Button size="lg" className="rounded-full w-16 h-16">
                        <Play className="h-8 w-8" fill="currentColor" />
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {item.gameInfo && (
                <div className="text-sm text-muted-foreground">
                  📍 {item.gameInfo.location} • Final Score: {item.gameInfo.score}
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="gap-2 h-8 px-2">
                    <Heart className="h-4 w-4" />
                    {item.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 h-8 px-2">
                    <MessageCircle className="h-4 w-4" />
                    {item.comments}
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}