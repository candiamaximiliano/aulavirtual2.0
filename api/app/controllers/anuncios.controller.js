const { Anuncio } = require("../config/db.config");

const getAnuncios = async () => {
  try {
    return await Anuncio.findAll();
  } catch (error) {
    console.error(error);
  }
};

const getAnuncioById = async (req, res, next) => {
  const { anuncioId } = req.params;
  try {
    const totalAnuncios = await getAnuncios();
    if (anuncioId) {
      const anuncioById = await totalAnuncios.filter((anuncio) =>
        anuncio.id.toLowerCase().includes(anuncioId.toLowerCase())
      );
      anuncioById.length
        ? res.status(200).send(anuncioById)
        : res.status(404).send("No existe un anuncio con ese identificador");
    } else {
      res.status(404).send("Por favor ingrese un identificador por params");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getAllAnuncios = async (req, res, next) => {
  try {
    const totalAnuncios = await getAnuncios();
    totalAnuncios.length > 0
      ? res.status(200).send(totalAnuncios)
      : res.status(404).send("No se encontraron anuncios");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const postAnuncio = async (req, res, next) => {
  try {
    const { portada, titulo, subtitulo, url, texto, recursos } = req.body;

    const parseStringToArray = (str) => {
      let array = str?.split(", ");
      return array;
    };

    const newAnuncio = await Anuncio.create({
      portada,
      titulo,
      subtitulo,
      url,
      texto,
      recursos: parseStringToArray(recursos),
    });

    res.send("Anuncio subido correctamente");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const putAnuncio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { base64, titulo, subtitulo, url, texto, recursos } = req.body;

    const parseStringToArray = (str) => {
      let array = str.split(", ");
      return array;
    };

    const anuncioEncontrado = await Anuncio.findOne({
      where: { id: id },
    });

    anuncioEncontrado === null
      ? res.status(404).send("No se encontró un anuncio con ese id")
      : await Anuncio.update(
          {
            base64,
            titulo,
            subtitulo,
            url,
            texto,
            recursos: parseStringToArray(recursos),
          },
          { where: { id: id } }
        );
    res.send("Anuncio actualizado correctamente");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteAnuncio = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Anuncio.destroy({
      where: {
        id: id,
      },
    });
    res.send("Anuncio eliminado correctamente");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAnuncios,
  getAnuncioById,
  postAnuncio,
  putAnuncio,
  deleteAnuncio,
};
