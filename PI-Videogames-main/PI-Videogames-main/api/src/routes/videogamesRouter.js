const { Router } = require("express");

const {getVideogamesHandlers,
    getVideoGamesIdHandlers } = require("../handlers/videogamesHandlers");

const { createVideogamesHandler } = require("../handlers/postHandlers");

const videogamesRouter = Router();

videogamesRouter.get("/", getVideogamesHandlers);

videogamesRouter.get("/:id", getVideoGamesIdHandlers);

videogamesRouter.post("/", createVideogamesHandler);

module.exports = videogamesRouter;