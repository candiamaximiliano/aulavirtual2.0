import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Vimeo from "@u-wave/react-vimeo";
import infiniteStyle from "../../styles/infinite.module.css";
import { Link } from "react-router-dom";

const LIMIT = 5;

const InfiniteScrollComponent = ({ data }) => {
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

  const [video, setVideo] = useState("vimeo");
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
                  onClick={({ fragmento }) => handleVideo(fragmento)}
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
          {video === "vimeo" ? (
            <img
              className={infiniteStyle.vimeo}
              src="http://localhost:8080/imagenes/sinvideo.png"
              alt=""
            />
          ) : (
            <Vimeo
              className={infiniteStyle.vimeo}
              video={video}
              autoplay
              width={780}
            />
          )}
        </div>
        <div className={infiniteStyle.recursos}>
          <ul className={infiniteStyle.ul}>
            {recurso?.map((recurso, index) => (
              <Link
                to={`${process.env.REACT_APP_BACKEND}/imagenes/${recurso}`}
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
