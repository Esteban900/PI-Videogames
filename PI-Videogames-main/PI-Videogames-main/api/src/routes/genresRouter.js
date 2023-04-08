const { Router } = require ("express");

const {  getGenresHandlers } = require("../handlers/genresHandlers");

const genresRouter = Router();

genresRouter.get("/", getGenresHandlers);

module.exports = genresRouter;