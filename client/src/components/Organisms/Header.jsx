import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { PrivateMenu } from "../Molecules/PrivateMenu";
import { PublicMenu } from "../Molecules/PublicMenu";
import header from "../../styles/header.module.css";

const Header = () => {
  const menu = useRef();
  const toggleMenu = () => menu.current.classList.toggle("show");
  const user = useSelector((state) => state.auth.user);
  return (
    <header className="main-header">
      <div className="ed-grid s-grid-5 lg-grid-4">
        <div className="s-cols-4 lg-cols-1 s-cross-center">
          <NavLink exact="true" to="/">
            <img
              src={`https://profesoradocaribeño.com.ar/static/Logotipo.png`}
              alt="ZunzuncitoLogo"
              width="200px"
              className={`main-logotype logo-christmas s-cross-center s-relative s-cursor-pointer ${header.encabezado}`}
            />
          </NavLink>
        </div>
        <div className="s-cols-1 lg-cols-3 s-cross-center s-main-end">
          <nav className="main-menu" ref={menu}>
            {user ? <PrivateMenu /> : <PublicMenu />}
          </nav>
          <div
            onClick={() => toggleMenu()}
            className="main-manu-toggle to-l"
          ></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
