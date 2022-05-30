const { Ciudad, Provincia } = require("../config/db.config");
const { ciudad } = require("../dbFill/ubicacion");

const ciudadesDb = async () => {
  for (let i = 0; i < ciudad.length; i++) {
    try {
      let provincia = await Provincia.findOne({
        where: {
          id: ciudad[i].idProv,
        },
      });
      let [ciudades, _created] = await Ciudad.findOrCreate({
        where: { NOMBRE_CIUDAD: ciudad[i].nombre },
      });
      ciudades.setProvincium(provincia);
    } catch (error) {
      console.log(error);
    }
  }
};

const getCiudades = async (req, res, next) => {
  const { provinciap } = req.params;
  try {
    let provincia = await Provincia.findOne({
      where: { NOMBRE_PROVINCIA: provinciap },
    });
    let ciudades = await Ciudad.findAll({
      where: { ProvinciumId: provincia.id },
    });
    return res.status(200).send(ciudades);
  } catch (error) {
    console.error(error);
    next(error);
    return res.status(404).send("Ciudades no encontradas");
  }
};

module.exports = {
  ciudadesDb,
  getCiudades,
};
