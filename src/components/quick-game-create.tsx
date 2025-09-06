import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Clock, MapPin, Users, Zap, Calendar, Plus } from "lucide-react";

interface QuickGroup {
  id: string;
  name: string;
  members: Array<{ id: string; name: string; avatar?: string }>;
  usualLocation: string;
  usualTimes: string[];
  lastPlayed: string;
  isActive: boolean;
}

const mockQuickGroups: QuickGroup[] = [
  {
    id: '1',
    name: 'Friday Squad',
    members: [
      { id: '1', name: 'Alex Rodriguez' },
      { id: '2', name: 'Maya Patel' },
      { id: '3', name: 'Chris Johnson' },
      { id: '4', name: 'Sarah Chen' },
      { id: '5', name: 'Jordan Smith' }
    ],
    usualLocation: 'Riverside Park Court',
    usualTimes: ['7:00 PM', '6:30 PM', '7:30 PM'],
    lastPlayed: '2 days ago',
    isActive: true
  },
  {
    id: '2',
    name: 'Weekend Warriors',
    members: [
      { id: '6', name: 'Marcus Davis' },
      { id: '7', name: 'Lisa Wang' },
      { id: '8', name: 'Tyler Brown' },
      { id: '9', name: 'Emma Wilson' }
    ],
    usualLocation: 'Central Park Courts',
    usualTimes: ['2:00 PM', '1:30 PM', '3:00 PM'],
    lastPlayed: '1 week ago',
    isActive: true
  }
];

interface QuickGameCreateProps {
  onCreateGame: (groupId: string, time: string) => void;
  onCreateNewGroup: () => void;
}

export function QuickGameCreate({ onCreateGame, onCreateNewGroup }: QuickGameCreateProps) {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleQuickCreate = (groupId: string, time: string) => {
    onCreateGame(groupId, time);
    setSelectedGroup(null);
    setSelectedTime(null);
  };

  const selectedGroupData = mockQuickGroups.find(g => g.id === selectedGroup);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-medium">Quick Game Setup</h2>
        <Badge variant="secondary" className="gap-1">
          <Zap className="h-3 w-3" />
          Fast
        </Badge>
      </div>

      {!selectedGroup ? (
        <div className="space-y-3">
          {mockQuickGroups.map((group) => (
            <Card key={group.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {group.members.slice(0, 3).map((member) => (
                        <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="text-xs">
                            {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {group.members.length > 3 && (
                        <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                          +{group.members.length - 3}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{group.name}</h3>
                      <p className="text-sm text-muted-foreground">Last played {group.lastPlayed}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => setSelectedGroup(group.id)}
                  >
                    <Zap className="h-4 w-4 mr-1" />
                    Play
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {group.usualLocation}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {group.members.length} players
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button 
            variant="outline" 
            className="w-full h-16 border-dashed"
            onClick={onCreateNewGroup}
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Group
          </Button>
        </div>
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{selectedGroupData?.name}</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedGroup(null)}>
                ← Back
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{selectedGroupData?.usualLocation}</span>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">When do you want to play?</h4>
              
              {/* Quick time slots for today */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Today (Sept 6)</p>
                <div className="grid grid-cols-3 gap-2">
                  {selectedGroupData?.usualTimes.map((time) => (
                    <Button
                      key={time}
                      variant="outline"
                      size="sm"
                      className="h-auto py-3 flex-col gap-1"
                      onClick={() => handleQuickCreate(selectedGroup, `Today ${time}`)}
                    >
                      <Clock className="h-4 w-4" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Quick time slots for tomorrow */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Tomorrow (Sept 7)</p>
                <div className="grid grid-cols-3 gap-2">
                  {selectedGroupData?.usualTimes.map((time) => (
                    <Button
                      key={time}
                      variant="outline"
                      size="sm"
                      className="h-auto py-3 flex-col gap-1"
                      onClick={() => handleQuickCreate(selectedGroup, `Tomorrow ${time}`)}
                    >
                      <Clock className="h-4 w-4" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-3"
                onClick={() => {/* Open full scheduler */}}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Pick different time
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}