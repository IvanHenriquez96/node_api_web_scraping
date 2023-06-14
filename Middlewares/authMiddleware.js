const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  //Obtener el Token de la petición
  const token = req.headers.authorization;

  if (token) {
    //verifica si se agregó un token a la petición
    try {
      const decoded = jwt.verify(token, process.env.APP_KEY); //verifica y decodifica el token

      // Agrega los datos decodificados del token a la solicitud para que estén disponibles en otros middleware o rutas
      req.userData = decoded;

      next(); //pasa al siguiente middleware o ruta
    } catch (error) {
      res.status(401).json({ msg: "Token Inválido" });
    }
  } else {
    return res.status(401).json({ msg: "se requiere token de autenticación" });
  }
};

module.exports = authMiddleware;
