const { Provincia, Pais } = require("../config/db.config");
const { provincia } = require("../dbFill/ubicacion");

const regionDb = async () => {
  for (let i = 0; i < provincia.length; i++) {
    try {
      let pais = await Pais.findOne({
        where: { id: provincia[i].idPais },
      });
      let [provincias, _created] = await Provincia.findOrCreate({
        where: { id: provincia[i].id, NOMBRE_PROVINCIA: provincia[i].nombre },
      });
      provincias.setPai(pais);
    } catch (error) {
      console.log(error);
    }
  }
};

const getProvincias = async (req, res) => {
  let provincias;
  try {
    provincias = await Provincia.findAll({
      where: { PaiId: 1 },
    });
    res.status(200).send(provincias);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  regionDb,
  getProvincias,
};
