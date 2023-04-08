const { getVideogamesById, getAllVideogames, searchGameByName } = require("../controllers/videogamesControllers");


//buscar todos los videogames

const getVideogamesHandlers = async (req, res) => {
    const { name } = req.query;
    //console.log("handler", name);
    const result =(name) ? await searchGameByName(name) : await getAllVideogames();
  
    try {
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error:error.message});
    }
};


//busqueda por id
const getVideoGamesIdHandlers = async (req,res) => {
    const { id } = req.params;

    const sourse = isNaN(id) ? "bdd" : "api";

   try {
        const videogame = await getVideogamesById(id, sourse);
        res.status(200).json(videogame);
   } catch (error) {
    res.status(400).json({ error: error.message});
   }
};

module.exports = {
    getVideogamesHandlers,
    getVideoGamesIdHandlers
}