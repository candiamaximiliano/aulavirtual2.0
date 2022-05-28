import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCurso } from "../../redux/actionCreators";
import { Banner } from "../Organisms/Banner";

const Curso = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const curso = useSelector((state) => state.cursoReducer.curso);
  useEffect(() => {
    dispatch(getCurso(id));
  }, [dispatch, id]);

  return (
    <>
      {curso && (
        <>
          <Banner
            color="dark-color"
            title={curso.nombre}
            subtitle=""
            info={curso.information}
            image={{
              src: "google.com.ar",
              alt: curso.nombre,
            }}
            courseBanner
            poster={curso.portada}
          />
          <main className="ed-grid lg-grid-10">
            <div className="lg-cols-7">
              <div className="course-features ed-grid lg-grid-3 s-border s-pxy-2">
                <div>
                  <h3 className="t4">¿Qué aprenderás?</h3>
                  <ul>
                    {curso[0].habilidades?.map((a, index) => (
                      <li key={index}>{a}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="t4">Conocimientos previos</h3>
                  <ul>
                    {curso[0].conocimientos?.map((a, index) => (
                      <li key={index}>{a}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="t4">Nivel</h3>
                  <p>{curso[0].nivel}</p>
                </div>
              </div>
              <h2>Temario de la especialidad</h2>
              <div>
                {curso[0].materia?.map((cr) => (
                  <div key={cr.id}>
                    <div className="ed-grid m-grid-3">
                      <img src={cr.portada} alt={cr.nombre} />
                      <div className="m-cols-2">
                        <h3>{cr.nombre}</h3>
                        <p>{cr.informacion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to={`/materias/`}>
                <p>Ver materias</p>
              </Link>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Curso;
