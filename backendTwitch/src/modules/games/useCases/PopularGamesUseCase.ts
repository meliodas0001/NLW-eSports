import { IGamesRepository } from "../repositories/IGamesRepository";
import { injectable, inject } from "tsyringe";

@injectable()
class PopularGamesUseCase {
  constructor(
    @inject("GamesRepository")
    private gamesRepository: IGamesRepository
  ) {}

  async execute() {
    const games = await this.gamesRepository.find();

    return games;
  }
}

export { PopularGamesUseCase };
