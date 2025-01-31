import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de tener Bootstrap instalado

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guarda el token en localStorage
        localStorage.setItem("token", data.token);

        // Cambia el estado de autenticación
        setIsAuthenticated(true);

        // Redirige al dashboard
        navigate("/dashboard");
      } else {
        setError(data.message || "Error en las credenciales");
      }
    } catch (err) {
      setError("Error en la conexión con el servidor");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#4B0082" }} // Fondo morado para la página
    >
      <div className="card shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">
          <h1 className="card-title text-center mb-4" style={{ color: "#333", fontSize: "2rem" }}>
            Iniciar Sesión
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}
            <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: "#00aaff", border: "none" }}>
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
