import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Vimeo from "@u-wave/react-vimeo";
import infiniteStyle from "../../styles/infinite.module.css";
import { Link } from "react-router-dom";

const LIMIT = 5;

const InfiniteScrollComponent = ({ data, portada }) => {
  const [postData, setPostData] = useState(data?.slice(0, LIMIT));
  const [visible, setVisible] = useState(LIMIT);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = () => {
    const newLimit = visible + LIMIT;
    const dataToAdd = data?.slice(visible, newLimit);

    if (data?.length > postData?.length) {
      setTimeout(() => {
        setPostData((prevPostData) => prevPostData.concat(dataToAdd));
      }, 2000);
      setVisible(newLimit);
    } else {
      setHasMore(false);
    }
  };

  const [video, setVideo] = useState("clase");
  const [recurso, setRecurso] = useState(["Sin recursos disponibles"]);

  const handleVideo = (fragmento) => {
    setVideo(fragmento.url);
    setRecurso(fragmento.recursos);
  };

  return (
    <>
      <div className={infiniteStyle.listaDeFragmentos}>
        <InfiniteScroll
          dataLength={postData?.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<p>Cargando...</p>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>¡Ya no hay mas clases por cargar!</b>
            </p>
          }
        >
          {postData?.map((fragmento) => {
            return (
              <ol className={infiniteStyle.ul}>
                <button
                  className={infiniteStyle.button}
                  key={fragmento.id}
                  onClick={() => handleVideo(fragmento)}
                >
                  <li className={infiniteStyle.li}>{fragmento.nombre}</li>
                </button>
                <hr />
              </ol>
            );
          })}
        </InfiniteScroll>
      </div>
      <div className={infiniteStyle.vimeoContainer}>
        <div className={infiniteStyle.vimeoSubContainer}>
          {video === "clase" ? (
            <img
              className={infiniteStyle.vimeo}
              src={`${process.env.REACT_APP_BACKEND}/imagenes/visualizarcontenido.png`}
              alt=""
            />
          ) : video === "vimeo" ? (
            <img
              className={infiniteStyle.vimeo}
              src={`${process.env.REACT_APP_BACKEND}/imagenes/sinvideo.png`}
              alt=""
            />
          ) : (
            <Vimeo className={infiniteStyle.vimeo} video={video} height={400} />
          )}
        </div>
        <div className={infiniteStyle.recursos}>
          <ul className={infiniteStyle.ul}>
            <h5 className={infiniteStyle.h5}>
              <i
                className={`fa-solid fa-download ${infiniteStyle.download}`}
              ></i>
              {"  Recursos:"}
            </h5>
            {recurso?.map((recurso, index) => (
              <Link
                to={`/imagenes/${recurso}`}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className={infiniteStyle.Link}
              >
                <li className={infiniteStyle.li}>{recurso}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default InfiniteScrollComponent;
