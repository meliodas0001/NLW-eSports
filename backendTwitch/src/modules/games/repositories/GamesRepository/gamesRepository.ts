import axios from "axios";
import { IPopularGames } from "../../dtos/IGamesRepositoryDTO";
import { IGamesRepository } from "../IGamesRepository";

class GamesRepository implements IGamesRepository {
  async find(): Promise<IPopularGames> {
    const games = await axios.get(
      "https://api.twitch.tv/helix/games/top?first=7",
      {
        headers: {
          "Client-Id": "",
          Authorization: "Bearer ",
        },
      }
    );

    games.data.data.map((x) => {
      return (x.box_art_url = x.box_art_url.replace(
        "{width}x{height}",
        "285x380"
      ));
    });

    let gamesFilter = games.data.data.filter((x) => x.id !== "509658");

    return gamesFilter;
  }
  async findByName(name: string): Promise<IPopularGames> {
    throw new Error("Method not implemented.");
  }
}

export { GamesRepository };
