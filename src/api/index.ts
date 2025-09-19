import type { GameRepository } from "./GameRepository";
import { MockGameRepository } from "./GameRepository.mock";

let singletonRepo: GameRepository | null = null;

export function getGameRepository(): GameRepository {
  if (!singletonRepo) {
    // In the future, switch by ENV to a real HTTP/SDK repository
    singletonRepo = new MockGameRepository();
  }
  return singletonRepo;
}


