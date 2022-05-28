import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMateria } from "../../redux/actionCreators";
import { Banner } from "../Organisms/Banner";
import { Link } from "react-router-dom";

const Materia = () => {
  const dispatch = useDispatch();
  const materia = useSelector((state) => state.materiaReducer.materia);
  useEffect(() => {
    dispatch(getMateria(1));
  }, [dispatch]);

  return (
    <>
      {materia && (
        <>
          <Banner
            color="dark-color"
            title={materia.name}
            subtitle={materia.subtitle}
            info={materia.information}
            image={{
              src: "",
              alt: materia.name,
            }}
            courseBanner
            poster={materia.picture}
            speciality={materia.data.specialities[0].name}
          />
          <main className="ed-grid lg-grid-10">
            <div className="lg-cols-7">
              <div className="course-features ed-grid lg-grid-3 l-block">
                <div>
                  <h3 className="t4">¿Qué aprenderás?</h3>
                  <ul dangerouslySetInnerHTML={{ __html: materia.you_learn }} />
                </div>
                <div>
                  <h3 className="t4">Conocimientos previos</h3>
                  <ul
                    dangerouslySetInnerHTML={{ __html: materia.requirements }}
                  />
                </div>
                <div>
                  <h3 className="t4">Nivel</h3>
                  <p>{materia.level}</p>
                </div>
              </div>
              <h2>Temario del curso</h2>
              <div>
                {materia.data.classes?.map((cl) => (
                  <div key={cl.class.id}>
                    <h3>{cl.class.title}</h3>
                    <p>{cl.class.description}</p>
                    <ul className="data-list">
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
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg-cols-3">
              <h2 className="t3">Profesor</h2>
              <p>Maxi Candia</p>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Materia;
