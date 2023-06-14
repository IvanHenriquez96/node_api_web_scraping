require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/database");

const app = express();

// Aplica el middleware 'cors' a todas las rutas
app.use(cors());

//Conectar a la DB
conectarDB();

//Middleware para analizar el cuerpo de las solicitudes en fotmato JSON
app.use(express.json());

const router = require("./routes/router"); //importar router
app.use("/", router); //usar el router

app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
});
