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
  status: "upcoming";
  isJoined: boolean;
  startISO: string;
  endISO: string;
  groupId?: string;
};

export type GameCreationData = {
  title: string;
  startTime: string;
  endTime: string;
  location: string;
  groupId?: string;
  dateISO: string;
  description?: string;
};


