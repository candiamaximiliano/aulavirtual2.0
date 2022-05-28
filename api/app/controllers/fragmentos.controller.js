const { Clase, Fragmento, Curso, Materia } = require("../config/db.config");

const getFragmentos = async () => {
  try {
    return await Fragmento.findAll();
  } catch (error) {
    console.error(error);
  }
};

const getFragmentoById = async (req, res, next) => {
  const { fragmentoId } = req.params;
  try {
    const totalFragmentos = await getFragmentos();
    if (fragmentoId) {
      const fragmentoById = await totalFragmentos.filter((fragmento) =>
        fragmento.id.toLowerCase().includes(fragmentoId.toLowerCase())
      );
      fragmentoById.length
        ? res.status(200).send(fragmentoById)
        : res.status(404).send("No existe un fragmento con ese identificador");
    } else {
      res.status(404).send("Por favor ingrese un identificador por params");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getAllFragmentos = async (req, res, next) => {
  try {
    const totalFragmentos = await getFragmentos();
    totalFragmentos.length > 0
      ? res.status(200).send(totalFragmentos)
      : res.status(404).send("No se encontraron fragmentos");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const postFragmento = async (req, res, next) => {
  try {
    const { curso, clase, materia, nombre, url, recursos } = req.body;

    const parseStringToArray = (str) => {
      let array = str?.split(", ");
      return array;
    };

    let fragmentoYaExiste = null;

    fragmentoYaExiste = Fragmento.findOne({
      where: {
        nombre,
        url,
        belongsToClase: clase,
        belongsToMateria: materia,
      },
    });

    const cursoDB = await Curso.findOne({
      where: {
        nombre: curso,
      },
    });

    const claseDB = await Clase.findOne({
      where: {
        belongsToMateria: materia,
        belongsToCurso: curso,
      },
    });

    let materiaDB = null;
    materiaDB = await Materia.findOne({
      where: {
        cursoId: cursoDB.id,
        nombre: materia,
      },
    });

    if (!claseDB) return res.status(404).send("Primero debes crear la clase");
    if (!cursoDB) return res.status(404).send("El curso no corresponde");
    if (!materiaDB)
      return res.status(404).send("Primero debes crear la materia");
    if (fragmentoYaExiste) {
      if (claseDB.id == fragmentoYaExiste.claseId) {
        return res
          .status(403)
          .send(
            "El fragmento que intentas añadir ya existe en nuestra base de datos"
          );
      } else {
        await Fragmento.create({
          nombre,
          url,
          recursos: parseStringToArray(recursos),
          belongsToClase: clase,
          belongsToMateria: materia,
        });
      }
    } else {
      await Fragmento.create({
        nombre,
        url,
        recursos: parseStringToArray(recursos),
        belongsToClase: clase,
        belongsToMateria: materia,
      });
    }

    const newFragmento = await Fragmento.findOne({
      where: {
        claseId: null,
        nombre,
        url,
        recursos: parseStringToArray(recursos),
        belongsToClase: clase,
        belongsToMateria: materia,
      },
    });

    newFragmento.setClase(claseDB);

    res.send("Fragmento subido correctamente");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const putFragmento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { curso, clase, materia, nombre, url, recursos } = req.body;

    const parseStringToArray = (str) => {
      let array = str.split(", ");
      return array;
    };

    const fragmentoEncontrado = await Fragmento.findOne({
      where: { id: id },
    });

    const claseDB = await Clase.findOne({
      where: {
        belongsToMateria: materia,
        belongsToCurso: curso,
      },
    });

    fragmentoEncontrado === null
      ? res.status(404).send("No se encontró un fragmento con ese id")
      : await Fragmento.update(
          {
            nombre,
            url,
            recursos: parseStringToArray(recursos),
            belongsToClase: clase,
            belongsToMateria: materia,
          },
          { where: { id: id } }
        );

    newFragmento.setClase(claseDB);

    res.send("Fragmento actualizado correctamente");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteFragmento = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Fragmento.destroy({
      where: {
        id: id,
      },
    });
    res.send("Fragmento eliminado correctamente");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllFragmentos,
  getFragmentoById,
  postFragmento,
  putFragmento,
  deleteFragmento,
};
