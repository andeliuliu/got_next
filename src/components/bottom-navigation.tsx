import { Button } from "./ui/button";
import { Home, Calendar, Users, MessageSquare, User } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'feed', icon: Home, label: 'Feed' },
    { id: 'games', icon: Calendar, label: 'Games' },
    { id: 'social', icon: Users, label: 'Social' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              className={`flex-col gap-1 h-auto py-2 px-3 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'fill-primary' : ''}`} />
              <span className="text-xs">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}