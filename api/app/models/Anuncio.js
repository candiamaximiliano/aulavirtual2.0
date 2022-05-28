const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("anuncio", {
    portada: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "anuncioGenerico",
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitulo: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    texto: {
      type: DataTypes.TEXT,
    },
    recursos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });
};
