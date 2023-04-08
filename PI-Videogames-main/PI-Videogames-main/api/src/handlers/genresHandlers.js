const { getGenres } = require("../controllers/genresControllers")


const getGenresHandlers = async (req, res) => {
   console.log("estoy en handler genres");

   try {
    const genres = await getGenres();
    res.status(200).json(genres);
   } catch (error) {
    res.status(400).json({error:error.message});
   }
};


module.exports = {getGenresHandlers}