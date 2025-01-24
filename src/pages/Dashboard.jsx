import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token del localStorage
    navigate("/login"); // Redirige al Login
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido al Dashboard</h1>
      <p style={styles.subtitle}>
        Aquí puedes administrar tus productos, ver reportes, y más.
      </p>

      {/* Simulación de secciones del Dashboard */}
      <div style={styles.sections}>
        <div style={styles.section}>
          <h3>Sección 1</h3>
          <p>Administra tus productos o servicios aquí.</p>
        </div>
        <div style={styles.section}>
          <h3>Sección 2</h3>
          <p>Consulta tus reportes y estadísticas.</p>
        </div>
        <div style={styles.section}>
          <h3>Sección 3</h3>
          <p>Configura las preferencias de tu cuenta.</p>
        </div>
      </div>

      {/* Botón para cerrar sesión */}
      <button style={styles.logoutButton} onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

// Estilos en línea (puedes moverlos a un archivo CSS si prefieres)
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    color: "#333",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "20px",
  },
  sections: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "30px",
  },
  section: {
    width: "30%",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  logoutButton: {
    padding: "10px 20px",
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  logoutButtonHover: {
    backgroundColor: "#ff7875",
  },
};

export default Dashboard;
