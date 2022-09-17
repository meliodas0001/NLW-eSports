import { container } from "tsyringe";

import { GamesRepository } from "../../modules/games/repositories/GamesRepository/gamesRepository";
import { IGamesRepository } from "../../modules/games/repositories/IGamesRepository";

container.registerSingleton<IGamesRepository>(
  "GamesRepository",
  GamesRepository
);
