import React from "react";
import { NavLink } from "react-router-dom";
import publicMenu from "../../styles/publicMenu.module.css";

export const PublicMenu = () => {
  return (
    <ul className={publicMenu.liContainer}>
      <li className={publicMenu.item}>
        <NavLink className={publicMenu.NavLink} to="/login">
          Iniciar Sesión <i className="fa-solid fa-right-to-bracket"></i>
        </NavLink>
      </li>
      <li className={publicMenu.item}>
        <NavLink className={publicMenu.NavLink} to="/registro">
          Registrarme <i className="fa-solid fa-user-plus"></i>
        </NavLink>
      </li>
    </ul>
  );
};
