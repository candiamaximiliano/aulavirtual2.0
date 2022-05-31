const { database } = require("./index");
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize(
  `postgres://${database.user}:${database.password}@${database.host}/profesorado`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "../models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "../models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  User,
  Role,
  RefreshToken,
  Curso,
  Materia,
  Clase,
  Fragmento,
  Ciudad,
  Provincia,
  Pais,
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
User.belongsTo(Ciudad);
User.belongsTo(Pais);
User.belongsTo(Provincia);
Provincia.hasMany(Ciudad);
Provincia.belongsTo(Pais);
Provincia.hasMany(User);
Ciudad.belongsTo(Provincia);
Ciudad.hasMany(User);
Pais.hasMany(Provincia);
Pais.hasMany(User);
User.belongsToMany(Curso, { through: "users_cursos" });
Curso.belongsToMany(User, { through: "users_cursos" });
Curso.hasMany(Materia);
Materia.belongsTo(Curso);
Materia.hasMany(Clase);
Clase.belongsTo(Materia);
Clase.hasMany(Fragmento);
Fragmento.belongsTo(Clase);
Role.belongsToMany(User, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
User.belongsToMany(Role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});
RefreshToken.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});
User.hasOne(RefreshToken, {
  foreignKey: "userId",
  targetKey: "id",
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
