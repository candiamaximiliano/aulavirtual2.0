import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMateria } from "../../redux/actionCreators";
import { Banner } from "../Organisms/Banner";
import { Link, useParams } from "react-router-dom";
import materiaStyle from "../../styles/materia.module.css";

const Materia = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const materia = useSelector((state) => state.materiaReducer.materia);
  useEffect(() => {
    dispatch(getMateria(id));
  }, [dispatch, id]);

  return (
    <div className={materiaStyle.container}>
      {materia && (
        <>
          <Banner
            color="dark-color"
            title={materia[0].nombre}
            subtitle={materia[0].subtitulo}
            info={materia[0].informacion}
            image={{
              src: "",
              alt: materia[0].nombre,
            }}
            courseBanner
            poster={materia[0].portada}
            speciality={materia[0].belongsToCurso}
          />
          <main className={`${materiaStyle.main}`}>
            <div className={materiaStyle.mainSubContainer}>
              <h2 className={materiaStyle.h2}>Listado de Clases</h2>
              <div className={materiaStyle.listadoDeClases}>
                {materia[0].clases?.map((cl) => (
                  <div className={materiaStyle.claseContainer}>
                    <Link
                      className={materiaStyle.claseLink}
                      to={`/clase/${cl.id}`}
                    >
                      <div className={materiaStyle.titleContainer} key={cl.id}>
                        <h4 className={materiaStyle.h4}>{cl.nombre}</h4>
                      </div>
                      <div className={materiaStyle.descriptionContainer}>
                        <p>{cl.descripcion}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Materia;
