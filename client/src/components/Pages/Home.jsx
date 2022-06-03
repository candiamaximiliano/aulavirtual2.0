import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Banner } from "../Organisms/Banner";
import { getAllAnuncios } from "../../redux/actionCreators";
import { Publication } from "../Organisms/Publication";
import home from "../../styles/home.module.css";

const Home = () => {
  const anuncios = useSelector((state) => state.anuncioReducer.anuncios);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAnuncios());
  }, [dispatch]);

  return (
    <div className={home.body}>
      <Banner
        color="dark-color"
        image=""
        title="Bienvenido a la experiencia más incleíble en educación online. Comienza hoy mismo a aprender"
        subtitle="Nuestro equipo ha desarrollado esta plataforma pensando en tí. Sabemos que estas buscando contenido de calidad. Aquí lo encontrarás"
        home={true}
        poster="home.png"
      />

      <main className={`ed-grid m-grid-2 ${home.main}`}>
        <div className="l-section m-cols-2">
          <h2 className={home.title}>Cartelera de anuncios</h2>
          {anuncios ? (
            <div>
              {anuncios?.map((p) => (
                <Publication
                  key={p.id}
                  coverImage={p.portada}
                  title={p.titulo}
                  subtitle={p.subtitulo}
                  url={p.url}
                  content={p.texto}
                />
              ))}
            </div>
          ) : (
            <p className={home.p}>No existen publicaciones</p>
          )}
        </div>
        {/* <div>
          <h3> Lista de categorías </h3>
          <ul className="feature-list">
            <li>
              <span>React.js</span>
            </li>
            <li>
              <span>React.native</span>
            </li>
            <li>
              <span>Angular</span>
            </li>
            <li>
              <span>View</span>
            </li>
            <li>
              <span>HTML</span>
            </li>
            <li>
              <span>CSS</span>
            </li>
          </ul>
        </div> */}
      </main>
    </div>
  );
};

export default Home;
