const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { backend, backend2 } = require("./index");
const fileUpload = require("express-fileupload");

//Importación de rutas
const auth = require("../routes/auth.routes");
const user = require("../routes/user.routes");
const anuncios = require("../routes/anuncios.routes");
const cursos = require("../routes/cursos.routes");
const materias = require("../routes/materias.routes");
const clases = require("../routes/clases.routes");
const profesores = require("../routes/profesores.routes");
const alumnos = require("../routes/alumnos.routes");
const fragmentos = require("../routes/fragmentos.routes");
const provincia = require("../routes/provincia.routes");
const ciudad = require("../routes/ciudad.routes");
const upload = require("../routes/upload.routes");

require("../config/db.config");

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use(fileUpload());
server.use(express.static("assets"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", backend); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  next();
});

//simple route
server.get("/api", (req, res, next) => {
  try {
    res.send("API Aula Virtual Profesorado en Ritmos Caribeños");
  } catch (error) {
    next(error);
  }
});

// routes
server.use("/api", auth);
server.use("/api", user);
server.use("/api", anuncios);
server.use("/api", cursos);
server.use("/api", materias);
server.use("/api", clases);
server.use("/api", profesores);
server.use("/api", alumnos);
server.use("/api", fragmentos);
server.use("/api", provincia);
server.use("/api", ciudad);
server.use("/api", upload);
/* /api/posts *
/api/posts/:id *
/api/especialidades *
/api/especialidades/:id *
/api/cursos
/api/cursos/:id
/api/profesores
/api/clase/:id */

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
