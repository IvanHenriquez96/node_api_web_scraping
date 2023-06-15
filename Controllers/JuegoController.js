const Juego = require("../Models/Juego");
const puppeteer = require("puppeteer");

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

const scrapper = async (url_game) => {
  try {
    //Hace Scraping
    console.log("scrapeando", url_game);

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    await page.goto(url_game);

    let data = await page.evaluate(() => {
      let title = document.querySelector("span.base").textContent.trim();
      let actual_price = document.querySelector("span.price").textContent.trim();
      let url_image = document
        .querySelector("img.fotorama__img")
        .getAttribute("src")
        .trim();

      return { title, actual_price, url_image };
    });

    await browser.close();

    //Fin Scrapping

    let { title, actual_price, url_image } = data;

    let fecha_hora = await fecha_hora_actual();

    const nuevoJuego = {
      title,
      url_game,
      url_image,
      actual_price,
      fecha_hora,
      prices: [{ actual_price, fecha_hora }],
    };
    console.log("juego scrapeado", nuevoJuego);
    return nuevoJuego;
  } catch (error) {
    console.log("error al scrapear", error);
  }
};

const scraping_url = async (req, res) => {
  let nuevoJuego = await scrapper(req.body.url_game);

  //Va a la URL donde se agregará a la BDD

  try {
    const opciones = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoJuego),
    };

    const response = await fetch(process.env.URL_API + "/api/", opciones);
    const data = await response.json();
    console.log("juego agregado a BDD :", data);
    res.status(200).json({ msg: "Juego Agregado" });
  } catch (error) {
    console.log("error al agregar a BDD", error);
  }
};

const fecha_hora_actual = () => {
  const now = new Date();

  const dia = String(now.getDate()).padStart(2, "0"); // Obtiene el día del mes actual y lo rellena con ceros a la izquierda si es necesario
  const mes = String(now.getMonth() + 1).padStart(2, "0"); // Obtiene el mes actual (los meses comienzan en 0) y lo rellena con ceros a la izquierda si es necesario
  const anio = now.getFullYear(); // Obtiene el año actual de cuatro dígitos

  const hora = String(now.getHours()).padStart(2, "0"); // Obtiene la hora actual y lo rellena con ceros a la izquierda si es necesario
  const minutos = String(now.getMinutes()).padStart(2, "0"); // Obtiene los minutos actuales y los rellena con ceros a la izquierda si es necesario
  const segundos = String(now.getSeconds()).padStart(2, "0"); // Obtiene los segundos actuales y los rellena con ceros a la izquierda si es necesario

  return `${dia}-${mes}-${anio} ${hora}:${minutos}:${segundos}`;
};

const actualizar_precios = async (req, res) => {
  //Obtiene los juegos de la lista
  const juegos = await Juego.find();

  for (const juego of juegos) {
    let data = await scrapper(juego.url_game);
    console.log("test", data);

    juego.actual_price = data.actual_price;
    juego.fecha_hora = data.fecha_hora;
    juego.prices = [
      ...juego.prices,
      { actual_price: data.actual_price, fecha_hora: data.fecha_hora },
    ];
    console.log("se va a guardar");
    juego.save();
    console.log("se guardó");
  }

  res.status(200).json({ msg: "intenta actuaklizar precios" });
};

module.exports = {
  readJuegos,
  findJuego,
  createJuego,
  updateJuego,
  deleteJuego,
  scraping_url,
  actualizar_precios,
};
