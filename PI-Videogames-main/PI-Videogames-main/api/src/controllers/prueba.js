const getApiInfo = async () => {

    const apiData = (await axios.get(`https://api.rawg.io/api/games/?key=8e2fc5fa445a45c28a8b221a64fdfcb6`)).data;
    
    // const allVideogames = apiData.results;

    // const apiInfoGames = allVideogames.map(games => axios.get(`https://api.rawg.io/api/games/${games.id}?key=8e2fc5fa445a45c28a8b221a64fdfcb6`));

    // const gamesAnswer = await Promise.all(apiInfoGames);
    // console.log(gamesAnswer);
    const apiInfo = apiData.data.results.map( game => ({
        
            id: game.id,
            name: game.name,
            image: game.background_image,
        // description: game.description.replace(/<[^>]+>/g,""), //en esta parte terminar de corregir los caracteres que aparecen
            // platforms: game.metacritic_platforms.map(el => el.platform.name).join(', '),
            // released:game.released,
            // rating:game.rating,
            // genres:game.genres.map(el => el.name).join(', '),
        
    }));
    return apiInfo;

}

//////////////////////////////////
const response = await axios.get(`https://api.rawg.io/api/games?key=8e2fc5fa445a45c28a8b221a64fdfcb6`);
    
const allVideogames = response.data.results;

const gameRequests = allVideogames.map(game => axios.get(`https://api.rawg.io/api/games/${game.id}?key=8e2fc5fa445a45c28a8b221a64fdfcb6`));

const gamesResponses = await axios.all(gameRequests);

const apiInfo = gamesResponses.map( response => {
   
   const {id,name,rating, released} = response.data;
   console.log(id,name);
       // id: game.id,
       // name: game.name,
       // image: game.background_image,
   // description: game.description.replace(/<[^>]+>/g,""), //en esta parte terminar de corregir los caracteres que aparecen
       // platforms: game.metacritic_platforms.map(el => el.platform.name).join(', '),
       // released:game.released,
       // rating:game.rating,
       // genres:game.genres.map(el => el.name).join(', '),
   return {
       id,
       name,
       rating,
       released,
   }
});
return apiInfo;



////////////////////////////////////////
// busqueda por name
// const searchGameByName = async (name) => {
//     console.log("me envio el name", name);

//     //busco en la bd
// const dataBaseGames = await Videogame.findAll({where: { name: name }});
//     //busco en la api
// const apiGames = (await axios.get(`https://api.rawg.io/api/games?search=${name.toLowerCase()}&key=8e2fc5fa445a45c28a8b221a64fdfcb6`)).data;

// const apiGamesResults = apiGames.results;

// const apiGamesSearch = apiGamesResults.map(game => {

//     return {
//         name: game.name,
//         // description: apiGames.description.replace(/<[^>]+>/g,""),
//         // platforms: apiGames.metacritic_platforms.map(el => el.platform.name).join(', '),
//         image:game.background_image,
//         released:game.released,
//         rating:game.rating,
//         // genres:apiGames.genres.map(el => el.name).join(', '),
//     };
// });
// console.log(apiGamesSearch);
// //const gamesApiName = await apiGames.filter(game => game.name.toLowerCase() === game.name.toLowerCase());
//     //concateno resultados
//     const gameName = [...dataBaseGames, ...apiGamesSearch];
//     // si tengo resultado devuelvo el game
//     if(gameName.length) {
//         return gameName;
//     } else {
//         res.send(`El videogames ${name} no existe`);
//     }

// }
 
