import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Calendar } from "./ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Calendar as CalendarIcon, 
  Clock, 
  UserPlus,
  Search,
  Check,
  X
} from "lucide-react";

interface Friend {
  id: string;
  name: string;
  avatar?: string;
  isSelected: boolean;
}

interface GameCreationFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (gameData: any) => void;
}

const mockFriends: Friend[] = [
  { id: '1', name: 'Alex Rodriguez', isSelected: false },
  { id: '2', name: 'Maya Patel', isSelected: false },
  { id: '3', name: 'Chris Johnson', isSelected: false },
  { id: '4', name: 'Sarah Chen', isSelected: false },
  { id: '5', name: 'Marcus Davis', isSelected: false },
  { id: '6', name: 'Lisa Wang', isSelected: false },
  { id: '7', name: 'Tyler Brown', isSelected: false },
  { id: '8', name: 'Emma Wilson', isSelected: false },
  { id: '9', name: 'Jordan Smith', isSelected: false },
  { id: '10', name: 'David Lee', isSelected: false }
];

const commonLocations = [
  'Riverside Park Basketball Court',
  'Central Park Courts',
  'Oak Street Recreation Center',
  'Downtown Community Center',
  'Westside Sports Complex'
];

export function GameCreationFlow({ isOpen, onClose, onComplete }: GameCreationFlowProps) {
  const [step, setStep] = useState(1);
  const [gameData, setGameData] = useState({
    title: '',
    location: '',
    date: new Date(),
    time: '',
    maxPlayers: 10,
    description: '',
    friends: mockFriends,
    saveAsGroup: false,
    groupName: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    onComplete(gameData);
    onClose();
    setStep(1);
  };

  const toggleFriend = (friendId: string) => {
    setGameData(prev => ({
      ...prev,
      friends: prev.friends.map(friend =>
        friend.id === friendId 
          ? { ...friend, isSelected: !friend.isSelected }
          : friend
      )
    }));
  };

  const selectedFriends = gameData.friends.filter(f => f.isSelected);
  const filteredFriends = gameData.friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Game Title</Label>
              <Input
                id="title"
                value={gameData.title}
                onChange={(e) => setGameData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Friday Night Hoops"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={gameData.location}
                onChange={(e) => setGameData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter court location"
                list="locations"
              />
              <datalist id="locations">
                {commonLocations.map((location) => (
                  <option key={location} value={location} />
                ))}
              </datalist>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={gameData.time}
                  onChange={(e) => setGameData(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxPlayers">Max Players</Label>
                <Input
                  id="maxPlayers"
                  type="number"
                  min="2"
                  max="20"
                  value={gameData.maxPlayers}
                  onChange={(e) => setGameData(prev => ({ ...prev, maxPlayers: parseInt(e.target.value) }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={gameData.description}
                onChange={(e) => setGameData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Any special notes or requirements..."
                rows={3}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={gameData.date}
                onSelect={(date) => date && setGameData(prev => ({ ...prev, date }))}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                className="rounded-md border"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Invite Friends</h3>
              <Badge variant="secondary">
                {selectedFriends.length} selected
              </Badge>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search friends..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    friend.isSelected ? 'bg-primary/5 border-primary' : 'hover:bg-accent'
                  }`}
                  onClick={() => toggleFriend(friend.id)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback>
                        {friend.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{friend.name}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    friend.isSelected ? 'bg-primary border-primary' : 'border-muted-foreground'
                  }`}>
                    {friend.isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                  </div>
                </div>
              ))}
            </div>

            {selectedFriends.length > 2 && (
              <div className="p-3 bg-accent rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    id="saveAsGroup"
                    checked={gameData.saveAsGroup}
                    onChange={(e) => setGameData(prev => ({ ...prev, saveAsGroup: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="saveAsGroup" className="text-sm">Save as recurring group</Label>
                </div>
                {gameData.saveAsGroup && (
                  <Input
                    placeholder="Group name (e.g., Friday Squad)"
                    value={gameData.groupName}
                    onChange={(e) => setGameData(prev => ({ ...prev, groupName: e.target.value }))}
                    className="mt-2"
                  />
                )}
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Review & Confirm</h3>
            
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{gameData.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{gameData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{gameData.date.toLocaleDateString()} at {gameData.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedFriends.length + 1}/{gameData.maxPlayers} players</span>
                </div>
                
                {selectedFriends.length > 0 && (
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-2">Invited friends:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedFriends.map((friend) => (
                        <Badge key={friend.id} variant="secondary" className="text-xs">
                          {friend.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {gameData.saveAsGroup && (
                  <div className="pt-2 border-t">
                    <Badge variant="outline" className="gap-1">
                      <Users className="h-3 w-3" />
                      Saved as "{gameData.groupName}"
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {step > 1 && (
              <Button variant="ghost" size="icon" onClick={handlePrevious}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle>
              {step === 1 && "Game Details"}
              {step === 2 && "Pick Date"}
              {step === 3 && "Invite Friends"}
              {step === 4 && "Review"}
            </DialogTitle>
          </div>
          <DialogDescription>
            {step === 1 && "Set up your basketball game with location and time"}
            {step === 2 && "Choose when you want to play"}
            {step === 3 && "Select friends to invite to your game"}
            {step === 4 && "Confirm your game details before creating"}
          </DialogDescription>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded ${
                  i <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {renderStep()}
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          {step < 4 ? (
            <Button 
              onClick={handleNext} 
              className="flex-1"
              disabled={
                (step === 1 && (!gameData.title || !gameData.location || !gameData.time)) ||
                (step === 3 && selectedFriends.length === 0)
              }
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleComplete} className="flex-1">
              Create Game
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}