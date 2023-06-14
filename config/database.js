const mongoose = require("mongoose");

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const db_name = process.env.DB_NAME;
const url = `mongodb+srv://${user}:${pass}@cluster0.rsp41dh.mongodb.net/${db_name}?retryWrites=true&w=majority`;

// Configuración y conexión a la base de datos

const conectarDB = async () => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Conexión exitosa a MongoDB Atlas");
  } catch (error) {
    console.error("Error al conectar a MongoDB Atlas:", error);
  }
};

module.exports = conectarDB;
