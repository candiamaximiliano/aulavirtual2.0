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
    portada: "instructorado.png",
    informacion:
      "Aprenderás a transmitir tus conocimientos en el baile para que tus alumnos desarrollen compentencias físicas y teóricas acerca de Salsa y Bachata.",
    habilidades: [
      "Técnica propia del ritmo",
      "Capacidad de transmitir tus conocimientos",
    ],
    conocimientos: [
      "Fundamentos de la salsa y la bachata",
      "Pasos y figuras básicas",
    ],
    nivel: "PRINCIPIANTE",
  });

  Curso.create({
    nombre: "Especialización en Estilo y Coreografía",
    portada: "especializacion.png",
    informacion:
      "Aprenderás a crear propuestas, dirigir y evaluar grupos coreográficos que apunten a desempeñarse en un espectáctulo social o competitivo.",
    habilidades: ["habilidad1", "habilidad2"],
    conocimientos: ["conocimiento1", "conocimiento2"],
    nivel: "INTERMEDIO",
  });

  Curso.create({
    nombre: "Profesorado en Ritmos Caribeños",
    portada: "profesorado.png",
    informacion:
      "Para aquellos que ya tienen trayectoria frente al alumno con este curso profundizarán sus conocimientos en Ritmos Caribeños, desarrollarán competencias pedagógicas y ampliarán sus horizontes de posibles proyectos de trabajo grupal.",
    habilidades: ["habilidad1", "habilidad2"],
    conocimientos: ["conocimiento1", "conocimiento2"],
    nivel: "AVANZADO",
  });
}

module.exports = {
  paisesDb,
  initial,
};
