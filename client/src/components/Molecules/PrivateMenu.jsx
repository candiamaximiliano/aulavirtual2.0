import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import privateMenu from "../../styles/privateMenu.module.css";

export const PrivateMenu = () => {
  const removeToken = () => {
    sessionStorage.removeItem("user");
    window.location = "/login";
  };
  const auth = useSelector((state) => state.auth);
  return (
    <div>
      <ul className={privateMenu.liContainer}>
        <li className={privateMenu.itemUser}>
          <NavLink className={privateMenu.user} to="/perfil">
            <i
              className={`fa-solid fa-user-large ${privateMenu.profileIcon}`}
            ></i>
            {`  ${auth.user.nombre} ${auth.user.apellido}`}
          </NavLink>
        </li>
        <li className={privateMenu.item}>
          <NavLink className={privateMenu.NavLink} to="/home">
            <i className={`fa-solid fa-message`}></i>
            {"  Anuncios"}
          </NavLink>
        </li>
        <li className={privateMenu.item}>
          <NavLink className={privateMenu.NavLink} to="/cursos">
            <i className="fa-solid fa-graduation-cap"></i>
            {"  Cursos"}
          </NavLink>
        </li>
        {/* <li>
        <NavLink to="/cursos">Cursos</NavLink>
      </li> */}
        <li className={privateMenu.item}>
          <NavLink className={privateMenu.NavLink} to="/profesores">
            <i className="fa-solid fa-user-pen"></i>
            {"  Profesores"}
          </NavLink>
        </li>
        <li className={privateMenu.item}>
          <button className={privateMenu.buttonLogout} onClick={removeToken}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </li>
      </ul>
    </div>
  );
};
