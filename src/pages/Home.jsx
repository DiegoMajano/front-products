import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar la autenticación al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Si hay un token, el usuario está autenticado
    } else {
      setIsAuthenticated(false); // Si no hay token, el usuario no está autenticado
    }
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(to right, #6a11cb, #2575fc)", // Degradado de colores
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
      }}
    >
      <div>
        <h1 className="display-3">Bienvenido a nuestra página</h1>
        <p className="lead">Explora todo lo que tenemos para ofrecerte</p>

        {!isAuthenticated && (
          <button className="btn btn-light btn-lg">
            <Link className="nav-link" to="/login">Iniciar Sesión</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
