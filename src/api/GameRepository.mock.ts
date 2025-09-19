import { upcomingGamesSeed } from "../mocks/games";
import { Game, GameCreationData } from "../types/game";
import { formatShortDate } from "../utils/datetime";
import { GameRepository } from "./GameRepository";

export class MockGameRepository implements GameRepository {
  private games: Game[] = [...upcomingGamesSeed];

  async listGames(): Promise<Game[]> {
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 50));
    return [...this.games];
  }

  async createGame(input: GameCreationData): Promise<Game> {
    await new Promise((r) => setTimeout(r, 50));
    const newGame: Game = {
      id: `game-${Date.now()}`,
      title: input.title,
      date: formatShortDate(new Date()),
      time: input.time,
      location: input.location,
      participants: [],
      maxPlayers: input.maxPlayers,
      status: "upcoming",
      isJoined: true,
    };
    this.games = [newGame, ...this.games];
    return newGame;
  }

  async createQuickGame(groupId: string, time: string): Promise<Game> {
    await new Promise((r) => setTimeout(r, 30));
    const newGame: Game = {
      id: `quick-${Date.now()}`,
      title: `Quick Game - Group ${groupId}`,
      date: time.includes("Today") ? "Today" : "Tomorrow",
      time,
      location: "Riverside Park Basketball Court",
      participants: [
        { id: "1", name: "Alex Rodriguez" },
        { id: "2", name: "Maya Patel" },
        { id: "3", name: "Chris Johnson" },
      ],
      maxPlayers: 10,
      status: "upcoming",
      isJoined: true,
    };
    this.games = [newGame, ...this.games];
    return newGame;
  }
}


