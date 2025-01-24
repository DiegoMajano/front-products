import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavBar from "../components/NavBar";
import { Products } from "../pages/Products";
import Dashboard from "../pages/Dashboard";
import Login from "../auth/Login";

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si hay un token almacenado (autenticación)
  useEffect(() => {
    const token = localStorage.getItem("fake"); // Verifica si existe un token
    setIsAuthenticated(!!token); // Si el token existe, el usuario está autenticado
  }, []);

  return (
    <Router>
      {/* Renderiza la barra de navegación solo si el usuario está autenticado */}
      {isAuthenticated && <NavBar />}

      <Routes>
        {/* Ruta del Login */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Ruta Protegida (Dashboard) */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />

        {/* Ruta Protegida (Products) */}
        <Route
          path="/products"
          element={
            isAuthenticated ? <Products /> : <Navigate to="/login" replace />
          }
        />

        {/* Redirige cualquier ruta no válida al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
