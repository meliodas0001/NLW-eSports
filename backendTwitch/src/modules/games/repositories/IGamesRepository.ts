import { IPopularGames } from "../dtos/IGamesRepositoryDTO";

interface IGamesRepository {
  find(): Promise<IPopularGames>;
  findByName(name: string): Promise<IPopularGames>;
}

export { IGamesRepository };
