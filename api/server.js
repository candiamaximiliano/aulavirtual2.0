const config = require("./app/config/index");
const server = require("./app/config/app.config");
const { conn } = require("./app/config/db.config");

const { Role, Curso } = require("./app/config/db.config");

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });

  Curso.create({
    nombre: "Instructorado en Salsa y Bachata",
  });

  Curso.create({
    nombre: "Especialización en Estilo y Coreografía",
  });

  Curso.create({
    nombre: "Profesorado en Ritmos Caribeños",
  });
}

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(config.port, () => {
    initial();
    console.log(`
    ################################################
          🛡️  Server listening on port: ${config.port} 🛡️
    ################################################`); // eslint-disable-line no-console
  });
});
