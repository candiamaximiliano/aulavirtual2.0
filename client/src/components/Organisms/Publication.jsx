import React from "react";

export const Publication = ({ coverImage, title, subtitle, url, content }) => {
  return (
    <article className="publication l-block">
      <div className="publication__container">
        <div className="imgContainer">
          <img src={coverImage} alt={title} />
        </div>
        <h2 className="publication__title t3">{title}</h2>
        <span>
          <b>{subtitle}</b> a las {url}
        </span>
        <div className="publication__content">
          <p>{content}</p>
        </div>
      </div>
    </article>
  );
};
