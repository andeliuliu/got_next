import { Game, GameCreationData } from "../types/game";

export interface GameRepository {
  listGames(): Promise<Game[]>;
  createGame(input: GameCreationData): Promise<Game>;
  createQuickGame(groupId: string, time: string): Promise<Game>;
}


