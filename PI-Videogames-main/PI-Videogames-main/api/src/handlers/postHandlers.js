const { createVideogame } = require ("../controllers/postControllers");


const createVideogamesHandler = async (req, res) => {
    console.log("estoy en posthandler");
   const {name, description, platforms, released, rating, image, genre} = req.body;
   console.log("name", name);
   try {
    const newVideogames = await createVideogame(name, description, platforms, released, rating, image, genre);
    res.status(200).json(newVideogames);

   } catch (error) {
    res.status(400).json({error: error.message});
   }
};

module.exports = {
    createVideogamesHandler
}