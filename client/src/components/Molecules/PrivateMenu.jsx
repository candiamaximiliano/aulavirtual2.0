import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const PrivateMenu = () => {
  const removeToken = () => {
    sessionStorage.removeItem("user");
    window.location = "/login";
  };
  const auth = useSelector((state) => state.auth);
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/profile">
            <i className="fa-solid fa-circle-user"></i>
            {/* {` ${auth.user.nombre} ${auth.user.apellido}`} */}
          </NavLink>
        </li>
        <li>
          <NavLink to="/cursos">
            <i className="fa-solid fa-graduation-cap"></i>
            {" Cursos"}
          </NavLink>
        </li>
        {/* <li>
        <NavLink to="/cursos">Cursos</NavLink>
      </li>
      <li>
        <NavLink to="/profesores">Profesores</NavLink>
      </li> */}
        <li>
          <button onClick={removeToken}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </li>
      </ul>
    </div>
  );
};
