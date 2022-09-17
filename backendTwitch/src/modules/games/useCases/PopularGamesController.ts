import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { PopularGamesUseCase } from "./PopularGamesUseCase";

class PopularGamesController {
  async handle(req: Request, res: Response) {
    const popularGamesUseCase = container.resolve(PopularGamesUseCase);
    const games = await popularGamesUseCase.execute();
    return res.json(games).send();
  }
}

export { PopularGamesController };
