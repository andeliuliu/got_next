import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Bell, Search } from "lucide-react";

interface HeaderProps {
  title: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  showProfile?: boolean;
  userAvatar?: string;
  userName?: string;
}

export function Header({ 
  title, 
  showSearch = false, 
  showNotifications = false, 
  showProfile = false,
  userAvatar,
  userName = "User"
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">{title}</h1>
        
        <div className="flex items-center gap-2">
          {showSearch && (
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Search className="h-5 w-5" />
            </Button>
          )}
          
          {showNotifications && (
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></div>
            </Button>
          )}
          
          {showProfile && (
            <Avatar className="h-8 w-8">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback className="text-xs">
                {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </header>
  );
}