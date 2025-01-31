import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import Navigation from "./navigation/Navigation";
import Products  from "./pages/Products";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Navigation setIsAuthenticated={setIsAuthenticated} />
      <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/products" element={isAuthenticated ? <Products /> : <Login setIsAuthenticated={setIsAuthenticated} />} />

      </Routes>
    </Router>
  );
}

export default App;
