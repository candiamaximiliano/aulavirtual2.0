const config = require("./app/config/index");
const server = require("./app/config/app.config");
const { conn } = require("./app/config/db.config");
const { paisesDb, initial } = require("./app/dbFill");
const { regionDb } = require("./app/controllers/provincias.controller");
const { ciudadesDb } = require("./app/controllers/ciudades.controller");

// Syncing all the models at once.
conn
  .sync({ force: false })
  .then(() => {
    server.listen(config.port, () => {
      console.log(`
    ################################################
          🛡️  Server listening on port: ${config.port} 🛡️
    ################################################`); // eslint-disable-line no-console
    });
  })
    .then(() => ciudadesDb())
  /*.then(() => paisesDb())
  .then(() => regionDb())
  .then(() => {
    initial();
    ciudadesDb().then(() => {
      console.log("datos precargados correctamente");
    });
  })*/
  .catch((error) => console.error(error));
