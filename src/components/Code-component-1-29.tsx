import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Plus, Calendar, Users, MapPin } from "lucide-react";

export function QuickActions() {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <Button className="h-20 flex-col gap-2" variant="default">
            <Plus className="h-6 w-6" />
            <span className="text-sm">Create Game</span>
          </Button>
          <Button className="h-20 flex-col gap-2" variant="outline">
            <Calendar className="h-6 w-6" />
            <span className="text-sm">Schedule</span>
          </Button>
          <Button className="h-20 flex-col gap-2" variant="outline">
            <Users className="h-6 w-6" />
            <span className="text-sm">Find Friends</span>
          </Button>
          <Button className="h-20 flex-col gap-2" variant="outline">
            <MapPin className="h-6 w-6" />
            <span className="text-sm">Find Courts</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}