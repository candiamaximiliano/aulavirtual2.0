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
    <>
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
          <main className={`ed-grid lg-grid-10 ${materiaStyle.main}`}>
            <div className="lg-cols-7">
              <div className="course-features ed-grid lg-grid-3 l-block">
                {/* <div>
                  <h3 className="t4">¿Qué aprenderás?</h3>
                  <ul dangerouslySetInnerHTML={{ __html: materia.you_learn }} />
                </div>
                <div>
                  <h3 className="t4">Conocimientos previos</h3>
                  <ul
                    dangerouslySetInnerHTML={{ __html: materia.requirements }}
                  />
                </div> */}
                {/* <div>
                  <h3 className="t4">Nivel</h3>
                  <p>
                    {materia.nivel?.map((lvl, index) => (
                      <ul key={index}>
                        <li>{lvl}</li>
                      </ul>
                    ))}
                  </p>
                </div> */}
              </div>
              <h2>Clases</h2>
              <div>
                {materia[0].clases?.map((cl) => (
                  <Link to={`/clase/${cl.id}`}>
                    <div key={cl.id}>
                      <h3>{cl.nombre}</h3>
                      <p>{cl.descripcion}</p>
                      {/* <ul className="data-list">
                      {cl.subjects?.map((s) => (
                        <li key={s.subject.id}>
                          <Link
                            to={`/clase/${s.subject.id}`}
                            className="color dark-color"
                          >
                            {s.subject.title}
                          </Link>
                        </li>
                      ))}
                    </ul> */}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {/* <div className="lg-cols-3">
              <h2 className="t3">Profesor/es</h2>
              <ul>
                materia[0].clases[0].profesores?.map
              </ul>
              <p>Maxi Candia</p>
            </div> */}
          </main>
        </>
      )}
    </>
  );
};

export default Materia;
