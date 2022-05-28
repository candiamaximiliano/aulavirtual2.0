const { Pais, Role, Curso } = require("../config/db.config");
const ROLES = require("../config/roles.config");

let pais = [{ id: 1, nombre: "Argentina" }];

function paisesDb() {
  pais.forEach((pais) => {
    Pais.findOrCreate({
      where: {
        NOMBRE_PAIS: pais.nombre,
        id: pais.id,
      },
    });
  });
}

function initial() {
  Role.create({
    id: 1,
    name: ROLES.Alumno,
  });

  Role.create({
    id: 2,
    name: ROLES.Profesor,
  });

  Role.create({
    id: 3,
    name: ROLES.Admin,
  });

  Role.create({
    id: 4,
    name: ROLES.Instructorado,
  });

  Role.create({
    id: 5,
    name: ROLES.Especializacion,
  });

  Role.create({
    id: 6,
    name: ROLES.Profesorado,
  });

  Curso.create({
    nombre: "Instructorado en Salsa y Bachata",
    portada: "Instructorado",
    informacion: "info instructorado",
    habilidades: ["habilidad1", "habilidad2"],
    conocimientos: ["conocimiento1", "conocimiento2"],
    nivel: "PRINCIPIANTE",
  });

  Curso.create({
    nombre: "Especialización en Estilo y Coreografía",
    portada: "Especialización",
    informacion: "info especializacion",
    habilidades: ["habilidad1", "habilidad2"],
    conocimientos: ["conocimiento1", "conocimiento2"],
    nivel: "INTERMEDIO",
  });

  Curso.create({
    nombre: "Profesorado en Ritmos Caribeños",
    portada: "Profesorado",
    informacion: "info profesorado",
    habilidades: ["habilidad1", "habilidad2"],
    conocimientos: ["conocimiento1", "conocimiento2"],
    nivel: "AVANZADO",
  });
}

module.exports = {
  paisesDb,
  initial,
};
