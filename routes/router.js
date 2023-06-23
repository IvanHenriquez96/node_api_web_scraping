const router = require("express").Router();
const HomeController = require("../Controllers/HomeController");
const JuegoController = require("../Controllers/JuegoController");
const AuthController = require("../Controllers/AuthController");
const authMiddleware = require("../Middlewares/authMiddleware");

router.get("/", HomeController.inicio);

router.get("/ruta_protegida", authMiddleware, HomeController.inicio);

router.get("/api/", JuegoController.readJuegos);
// router.get("/api/:id", JuegoController.findJuego);
router.post("/api/", JuegoController.agregarJuego);
router.patch("/api/:id", JuegoController.updateJuego);
router.delete("/api/:id", JuegoController.deleteJuego);

// router.post("/api/scraping_url", JuegoController.scraping_url);
router.post("/api/actualizar_precios", JuegoController.actualizar_precios);

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

module.exports = router;
