const { Videogame, Genre } = require("../db")


const createVideogame = async (name, description, platforms, released, rating, image, genre) => {
console.log("estoy en postControllers");
console.log("name", name);
const newGames = await Videogame.create({
    name,
    description,
    platforms,
    released,
    rating,
    image,
    genre
});
const genreDb = await Genre.findAll({
    where: {name: genre}
})
newGames.addGenre(genreDb);
return "Videogames creado con exito";
};

module.exports = {createVideogame};