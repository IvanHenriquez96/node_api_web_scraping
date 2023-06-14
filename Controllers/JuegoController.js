const Juego = require("../Models/Juego");

const readJuegos = async (req, res) => {
  const juegos = await Juego.find();
  res.json({
    mensaje: "Lista de Juegos",
    data: juegos,
  });
};

const findJuego = async (req, res) => {
  const juego = await Juego.findById(req.params.id);
  res.json(juego);
};

const createJuego = async (req, res) => {
  console.log("entro a create");
  const newJuego = new Juego(req.body);

  try {
    await newJuego.save();
    res.status(200).json({ msg: "Juego Agregado" });
  } catch (error) {
    res.status(500).json({ msg: error });

    console.log("Error al agregar juego", error);
  }
};

const updateJuego = async (req, res) => {
  try {
    const juego = await Juego.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ msg: "Juego Actualizado" });
  } catch (error) {
    console.log("Error al actualizar juego", error);
  }
};

const deleteJuego = async (req, res) => {
  try {
    await Juego.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Juego Eliminado" });
  } catch (error) {
    console.log("Error al eliminar juego", error);
  }
};

module.exports = {
  readJuegos,
  findJuego,
  createJuego,
  updateJuego,
  deleteJuego,
};
