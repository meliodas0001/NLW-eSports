import { Router } from "express";

const gamesRoutes = Router();

import { PopularGamesController } from "../modules/games/useCases/PopularGamesController";

const popularGamesController = new PopularGamesController();

gamesRoutes.get("/", popularGamesController.handle);

export { gamesRoutes };
