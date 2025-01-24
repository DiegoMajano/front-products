import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/navStyles.module.css";

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      {/* Logo */}
      <img
        src="https://via.placeholder.com/50"
        alt="Logo"
        className={styles.logo}
      />

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
      </ul>
    </nav>
  );
};

export default NavBar;
