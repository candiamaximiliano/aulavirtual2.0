import React from "react";
import { Link } from "react-router-dom";
import card from "../../styles/card.module.css";

export const Card = ({ cardId, picture, name, path }) => {
  return (
    <article className={`card s-border ${card.border}`}>
      <div className={`img-container s-ratio-16-9 ${card.imageContainer}`}>
        <Link to={`/${path}/${cardId}`}>
          <img
            src={`${process.env.REACT_APP_BACKEND}/imagenes/${picture}`}
            alt={name}
            className={`${card.image}`}
          />
          {console.log(picture)}
        </Link>
      </div>
      <div className={`card__data s-pxy-2 ${card.nameContainer}`}>
        <h3 className="t4 center">{name}</h3>
      </div>
    </article>
  );
};
