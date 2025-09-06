import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Calendar, Clock, MapPin, Users, MessageSquare } from "lucide-react";

interface GameCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  maxPlayers: number;
  status: 'upcoming' | 'live' | 'completed';
  isJoined: boolean;
}

export function GameCard({ 
  id, 
  title, 
  date, 
  time, 
  location, 
  participants, 
  maxPlayers, 
  status,
  isJoined 
}: GameCardProps) {
  const spotsLeft = maxPlayers - participants.length;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{title}</h3>
            <Badge variant={status === 'live' ? 'default' : status === 'completed' ? 'secondary' : 'outline'}>
              {status === 'live' ? 'Live' : status === 'completed' ? 'Completed' : 'Upcoming'}
            </Badge>
          </div>
          {isJoined && (
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {date}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {time}
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {location}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="flex -space-x-2">
              {participants.slice(0, 4).map((participant) => (
                <Avatar key={participant.id} className="h-8 w-8 border-2 border-background">
                  <AvatarImage src={participant.avatar} alt={participant.name} />
                  <AvatarFallback className="text-xs">
                    {participant.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
              {participants.length > 4 && (
                <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                  +{participants.length - 4}
                </div>
              )}
            </div>
            <span className="text-sm text-muted-foreground ml-1">
              {participants.length}/{maxPlayers}
            </span>
          </div>
          
          {!isJoined && status === 'upcoming' && (
            <Button size="sm" variant={spotsLeft > 0 ? "default" : "secondary"} disabled={spotsLeft === 0}>
              {spotsLeft > 0 ? `Join (${spotsLeft} spots left)` : 'Full'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}