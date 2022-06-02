import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Protected from "./Routes/Protected";

import Home from "./Pages/Home";
import Cursos from "./Pages/Cursos";
import Curso from "./Pages/Curso";
import Materias from "./Pages/Materias";
import Materia from "./Pages/Materia";
import Profesores from "./Pages/Profesores";
import Clase from "./Pages/Clase";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Layout from "./Pages/Layout";
import Page404 from "./Pages/Page404";
import Unauthorized from "./Pages/Unauthorized";
import Header from "./Organisms/Header";
import Perfil from "./Pages/Perfil";

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Layout />} />
      {/* public routes */}
      <Route path="/registro" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* we want to protect these routes */}
      <Route
        element={<Protected allowedRoles={[process.env.REACT_APP_ALUMNO]} />}
      >
        <Route path="/home" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/cursos/:id" element={<Curso />} />
        <Route path="/materias" element={<Materias />} />
        <Route path="/materias/:id" element={<Materia />} />
        <Route path="/profesores" element={<Profesores />} />
        <Route path="/clase/:id" element={<Clase />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>

      {/* <Route element={<Protected allowedRoles={[profesor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>

        <Route element={<Protected allowedRoles={[admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<Protected allowedRoles={[admin, profesor]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route> */}

      {/* catch all */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  </Router>
);

export default App;
