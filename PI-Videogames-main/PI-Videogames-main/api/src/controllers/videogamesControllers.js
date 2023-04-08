const { Videogame, Genre } = require ("../db");

const axios = require ("axios");

//LLAMADO A LA API

const getApiInfo = async () => {

      let allGames = [];
      for(let i = 1; i < 6; i++){

        const apiData = await axios.get(`https://api.rawg.io/api/games?key=8e2fc5fa445a45c28a8b221a64fdfcb6&page=${i}`);
        
        const allVideogames = apiData.data.results;
        
        allGames = [...allGames, ...allVideogames];
      }

        const apiInfoGames = allGames.map(games => axios.get(`https://api.rawg.io/api/games/${games.id}?key=8e2fc5fa445a45c28a8b221a64fdfcb6`));
          
        const gamesAnswer = await Promise.all(apiInfoGames);
       
        const apiInfoDetail = await Promise.all( gamesAnswer.map( game => {
          
            return {
                id: game.data.id,
                name: game.data.name,
                image: game.data.background_image,
                description: game.data.description.replace(/<[^>]+>/g,""),
                platforms: game.data.platforms.map(el => el.platform.name).join(', '),
                released:game.data.released,
                rating:game.data.rating,
                genres:game.data.genres.map(el => el.name).join(', '),
            };
           
        }));
     
        return apiInfoDetail;
       
}
//FIN LLAMADO A API PARA TODOS LOS VIDEOGAMES



//LLAMADO A BASE DE DATOS

const getDbInfo = async () => {
    return await Videogame.findAll({
        include: {
            model:Genre,
            attributes: ['name'],
            throw: {
                attributes:[]
            },
        }
    })
}
//FIN LLAMADO A BASE DE DATOS
    


//TRAER TODOS LOS VIDEOGAMES

const getAllVideogames = async() => {
    const apiInfo = await getApiInfo();
       const dbInfo = await getDbInfo();
    return [...apiInfo, ...dbInfo];
}
//FIN DE TRAER TODOS LOS POKEMON

//BUSQUEDA POR NOMBRE

const searchGameByName = async (name) => {
    //console.log("me envio el name", name);
   
    const allGames = await getAllVideogames();
   
        const videogameName = allGames.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));
     
        if(videogameName.length) {
            while(videogameName.length > 15){
                videogameName.pop();
            }
          return videogameName;
        } else {
          
          return `El videogames ${name} no existe`;
        }       
    } 

//FIN BUSQUEDA POR NOMBRE





//BUSQUEDA POR ID 

const getVideogamesById = async (id, sourse) => {
    
    if(sourse === "api") {
        const videogameData = (await axios.get(`https://api.rawg.io/api/games/${id}?key=8e2fc5fa445a45c28a8b221a64fdfcb6`)).data;
        const videogame = {
            name: videogameData.name,
            description: videogameData.description.replace(/<[^>]+>/g,""),
            platforms: videogameData.metacritic_platforms.map(el => el.platform.name).join(', '),
            image:videogameData.background_image,
            released:videogameData.released,
            rating:videogameData.rating,
            genres:videogameData.genres.map(el => el.name).join(', '),
        };
         //console.log(videogame);
        return videogame;
    } else {
        const videogamesDb = await Videogame.findByPk(id);
        return videogamesDb;
    }
};
//FIN BUSQUEDA POR ID




module.exports = {
    getVideogamesById,
    getAllVideogames,
    searchGameByName
}

