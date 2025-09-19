export type Participant = {
  id: string;
  name: string;
};

export type Game = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: Participant[];
  maxPlayers: number;
  status: "upcoming";
  isJoined: boolean;
};

export type GameCreationData = {
  title: string;
  time: string;
  location: string;
  maxPlayers: number;
};


