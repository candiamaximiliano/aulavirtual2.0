import React, { useEffect } from "react";
import Vimeo from "@u-wave/react-vimeo";
import { getClase, getMateria } from "../../redux/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Clase = () => {
  const dispatch = useDispatch;
  const clase = useSelector((state) => state.claseReducer.clase);
  const materia = useSelector((state) => state.materiaReducer.materia);
  useEffect(() => {
    dispatch(getMateria(1));
    dispatch(getClase(123));
  }, [dispatch]);

  return (
    <div className="class-page-container background dark-color">
      {clase && materia && (
        <div className="ed-grid lg-grid-12">
          <div className="lg-cols-8 ">
            <div>
              <Vimeo video={clase.video} autoplay width={780} />
            </div>
            <div>
              <h1 className="">{clase.name}</h1>
              <span>{materia.name}</span>
            </div>
          </div>
          <div className="lg-cols-4">
            <div>
              <h2 className="t3">Temario del curso</h2>
              {materia.data.classes?.map((cl) => (
                <div key={cl.class.id}>
                  <h3>{cl.class.title}</h3>
                  <ul className="data-list">
                    {cl.subjects?.map((s) => (
                      <li key={s.subject.id}>
                        <Link
                          to={`/clase/${s.subject.id}`}
                          className="color light-color"
                        >
                          {s.subject.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clase;
