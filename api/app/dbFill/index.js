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
      "Si bien la cultura caribeña nos ofrece una amplia gama de posibilidades, son especificamente la salsa y la bachata las que más se destacan en el plano global actualmente. Es por eso que en este espacio aprenderás a transmitir tus conocimientos en el baile para que tus alumnos desarrollen compentencias físicas y teóricas acerca de estos dos géneros.",
    habilidades: [
      "Conocimiento general en los distintos estilos de salsa y bachata",
      "Técnica propia del ritmo",
      "Historia y musicalidad",
      "Auto-conocimiento corporal, flexibilidad y fuerza",
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
      "El baile artístico es lo que nos permite expresar y difundir los ritmos con los que trabajamos. Por ello en este espacio te brindamos las herramientas para que puedas desarrollarte en esta área y puedas proyectarte como líder de grupo.",
    habilidades: [
      "Preparación física",
      "Técnica en danzas madres (Afro y Clásico)",
      "Estilos en salsa y bachata",
      "Armado coreográfico",
      "Herramientas escénicas",
      "Marketing",
    ],
    conocimientos: [
      "Ser instructor",
      "Tener conocimientos intermedios o experiencia a tráves del tiempo",
    ],
    nivel: "INTERMEDIO",
  });

  Curso.create({
    nombre: "Profesorado en Ritmos Caribeños",
    portada: "profesorado.png",
    informacion:
      "En este punto de tu recorrido formativo te vas a apropiar de todos los conocimientos generales con respecto a la gran variedad que nos ofrece la cultura caribeña, atravesando su historia, música y danza. Para aquellos que ya tienen trayectoria frente al alumno con este curso profundizarán sus conocimientos en Ritmos Caribeños, desarrollarán competencias pedagógicas y ampliarán sus horizontes de posibles proyectos de trabajo grupal.",
    habilidades: [
      "Couching y manejo de grupos",
      "Fusión de ritmos",
      "Historia de todos los Ritmos Caribeños",
      "Cómo transmitir la musicalidad a tus alumnos",
      "Salud y entrenamiento del bailarín profesional",
      "Ritmos aledaños como Merengue, Cha Cha Cha, Son y Kizomba",
    ],
    conocimientos: [
      "Ser instructor",
      "Ser especialista en estilo y coreografía",
    ],
    nivel: "AVANZADO",
  });
}

module.exports = {
  paisesDb,
  initial,
};
