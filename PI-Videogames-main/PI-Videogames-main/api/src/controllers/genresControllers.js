const { Genre } = require("../db");
const axios = require("axios");

const getGenres = async () => {

console.log("estoy en genrescontrollers");
const genresApi = (await axios.get(`https://api.rawg.io/api/genres?key=8e2fc5fa445a45c28a8b221a64fdfcb6`)).data;
//const genresResults = genresApi.results;
 const genresAll = genresApi.results.map(genre => genre.name);
 console.log(genresAll);
 genresAll.forEach(element => {
    Genre.findOrCreate({
        where: {name: element}
    })
 });
 const allGenres = await Genre.findAll();
 return allGenres;
}


module.exports= {
    getGenres
}