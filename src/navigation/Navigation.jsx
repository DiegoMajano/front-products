import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavBar from "../components/NavBar";
import Dashboard from "../pages/Dashboard";
import Login from "../auth/Login";
import { Products } from "../pages/Products";

const products = [
  {
    id: 1,
    name: "Laptop",
    description: "Laptop gaming ultra rápida",
    price: 1200.99,
    quantity: 5,
  },
  {
    id: 2,
    name: "Smartphone",
    description: "Celular con cámara de 108MP",
    price: 899.99,
    quantity: 10,
  },
  {
    id: 3,
    name: "Headphones",
    description: "Auriculares ",
    price: 199.99,
    quantity: 15,
  },
];
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
            isAuthenticated ? (
              <Products products={products} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Redirige cualquier ruta no válida al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
