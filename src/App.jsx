import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import Navigation from "./navigation/Navigation";
import Products  from "./pages/Products";
import Home from "./pages/Home";

function App() {
  // Recuperar el estado de autenticación desde localStorage al iniciar
  const storedAuthStatus = localStorage.getItem('isAuthenticated') === 'true';
  const [isAuthenticated, setIsAuthenticated] = useState(storedAuthStatus);

  // Guardar el estado de autenticación en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <Navigation setIsAuthenticated={setIsAuthenticated} />
      <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/products" element={isAuthenticated ? <Products /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
}

export default App;

