import { Game } from "../types/game";

export const upcomingGamesSeed: Game[] = [
  {
    id: "1",
    title: "Friday Night Hoops",
    date: "Today",
    time: "7:00 PM",
    location: "Riverside Park Basketball Court",
    participants: [
      { id: "1", name: "Alex Rodriguez" },
      { id: "2", name: "Jordan Smith" },
      { id: "3", name: "Maya Patel" },
      { id: "4", name: "Chris Johnson" },
      { id: "5", name: "Sarah Chen" },
    ],
    maxPlayers: 10,
    status: "upcoming",
    isJoined: true,
  },
  {
    id: "2",
    title: "Weekend Pickup",
    date: "Tomorrow",
    time: "2:00 PM",
    location: "Central Park Courts",
    participants: [
      { id: "6", name: "Marcus Davis" },
      { id: "7", name: "Lisa Wang" },
      { id: "8", name: "Tyler Brown" },
    ],
    maxPlayers: 8,
    status: "upcoming",
    isJoined: false,
  },
  {
    id: "3",
    title: "Morning Shootaround",
    date: "Sunday",
    time: "9:00 AM",
    location: "Oak Street Recreation Center",
    participants: [
      { id: "9", name: "David Lee" },
      { id: "10", name: "Emma Wilson" },
      { id: "11", name: "Jake Miller" },
      { id: "12", name: "Rachel Green" },
      { id: "13", name: "Tom Anderson" },
      { id: "14", name: "Nina Roberts" },
    ],
    maxPlayers: 12,
    status: "upcoming",
    isJoined: false,
  },
];


