import React from "react";
import { Link } from "react-router-dom";
import unauthorized from "../../styles/unauthorized.module.css";

const Unauthorized = () => (
  <div className="ed-grid">
    <div className={unauthorized.unauthorizedContainer}>
      <img
        className={unauthorized.error403}
        src="https://profesoradocaribeño.com.ar/imagenes/403.png"
        alt="Forbidden"
      />
      <Link className={unauthorized.regresar} to="/">
        Regresar
      </Link>
    </div>
  </div>
);

export default Unauthorized;
