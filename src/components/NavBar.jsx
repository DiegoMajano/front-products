import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/navStyles.module.css";

const NavBar = () => {
  const navigate = useNavigate(); // Hook para redirigir

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Borra el token
    navigate("/login"); // Redirige al login
  };

  return (
    <nav className={styles.nav}>
      {/* Logo */}
      <img src="" alt="Logo" className={styles.logo} title="PRODUCTKODIGO" />

      {/* Opciones de navegación */}
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? styles.navActive : "")}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? styles.navActive : "")}
          >
            Products
          </NavLink>
        </li>
        <li>
          <button className={"btn btn-secondary "} onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
