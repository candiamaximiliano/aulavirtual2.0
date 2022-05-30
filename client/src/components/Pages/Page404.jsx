import React from "react";
import { Link } from "react-router-dom";
import page404 from "../../styles/page404.module.css";

const Page404 = () => (
  <div className="ed-grid">
    <div className={page404.NotFoundContainer}>
      <img
        className={page404.error404}
        src="https://profesoradocaribeño.com.ar/static/404.png"
        alt="Not Found"
      />
      <Link className={page404.regresar} to="/">
        Regresar
      </Link>
    </div>
  </div>
);

export default Page404;
