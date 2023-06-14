const inicio = async (req, res) => {
  res.json({
    mensaje: "IHENRIQUEZ - API WEB SCRAPING",

    urls: [
      { path: "GET | /login", desc: "Login y devuelve token" },
      { path: "POST | /register", desc: "Crea un nuevo usuario" },

      { path: "GET | /api/", desc: "Lista todos los juegos" },
      { path: "GET | /api/{id}", desc: "Busca solo un juego" },
      { path: "POST | /api/", desc: "Crea un nuevo juego" },
      { path: "PATCH | /api/{id}", desc: "Actualiza un juego" },
      { path: "DELETE | /api/{id}", desc: "Borra una juego" },
    ],
  });
};

module.exports = {
  inicio,
};
