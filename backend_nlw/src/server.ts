import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "./utils/conver-minutes-to-hour-string";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

/**
 * Query: Persistir Estado
 * Route: ...
 * Body: ...

 */

// HTTP methods / API RESTful / HTTP Codes

// GET, POST, PUT, PATCH, DELETE

app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  console.log(games);
  return res.json(games);
});

app.post("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const {
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel,
  } = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays: weekDays.join(","),
      hourStart: convertHourStringToMinutes(hourStart),
      hourEnd: convertHourStringToMinutes(hourEnd),
      useVoiceChannel,
    },
  });

  return res.status(201).send(ad);
});

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.send(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    })
  );
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return res.json({
    discord: ad.discord,
  });
});

app.listen(3001, () => {
  console.log("Application is Running!");
});
