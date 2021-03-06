import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCurso } from "../../redux/actionCreators";
import { Banner } from "../Organisms/Banner";
import cursoStyle from "../../styles/curso.module.css";

const Curso = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const curso = useSelector((state) => state.cursoReducer.curso);
  useEffect(() => {
    switch (Number(id)) {
      case 1:
        if (auth?.user.roles?.includes(process.env.REACT_APP_INSTRUCTORADO)) {
          return dispatch(getCurso(id));
        } else {
          navigate("/unauthorized");
        }
        break;

      case 2:
        if (auth?.user.roles?.includes(process.env.REACT_APP_ESPECIALIZACION)) {
          return dispatch(getCurso(id));
        } else {
          navigate("/unauthorized");
        }
        break;

      case 3:
        if (auth?.user.roles?.includes(process.env.REACT_APP_PROFESORADO)) {
          return dispatch(getCurso(id));
        } else {
          navigate("/unauthorized");
        }
        break;

      default:
        return navigate("/unauthorized");
    }
  }, [dispatch, id, auth?.user.roles, navigate]);

  return (
    <>
      {curso && (
        <>
          <Banner
            color="dark-color"
            title={curso[0].nombre}
            subtitle=""
            info={curso[0].informacion}
            image={{
              src: "google.com.ar",
              alt: curso[0].nombre,
            }}
            courseBanner
            poster={curso[0].portada}
          />
          <main className={`ed-grid lg-grid-10 ${cursoStyle.main}`}>
            <div className={`lg-cols-7 ${cursoStyle.container}`}>
              <div
                className={`course-features ed-grid lg-grid-3 s-border s-pxy-2 ${cursoStyle.features}`}
              >
                <div className={cursoStyle.card}>
                  <h3 className="t4">??Qu?? necesit??s para cursar?</h3>
                  <ul className={cursoStyle.ul}>
                    {curso[0].conocimientos?.map((a, index) => (
                      <li className={cursoStyle.li} key={index}>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={cursoStyle.card}>
                  <h3 className="t4">??Qu?? aprender??s?</h3>
                  <ul className={cursoStyle.ul}>
                    {curso[0].habilidades?.map((a, index) => (
                      <li className={cursoStyle.li} key={index}>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={cursoStyle.card}>
                  <h3 className="t4">Nivel</h3>
                  <p>{curso[0].nivel}</p>
                </div>
              </div>
              <h2 className={cursoStyle.h2}>Lista de materias</h2>
              <div className={cursoStyle.temario}>
                {curso[0].materia?.map((cr) => (
                  <div className={cursoStyle.materia} key={cr.id}>
                    <div className="ed-grid m-grid-3">
                      <Link to={`/materias/${cr.id}`}>
                        <img
                          src={`${process.env.REACT_APP_BACKEND}/imagenes/${cr.portada}`}
                          alt={cr.nombre}
                          className={cursoStyle.imagen}
                        />
                      </Link>
                      <div className="m-cols-2">
                        <h3 className={cursoStyle.h3}>{cr.nombre}</h3>
                        <p className={cursoStyle.p}>{cr.informacion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Curso;
