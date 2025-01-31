import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navigation = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://127.0.0.1:8000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verificando autenticación", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
      }
    };

    checkAuth();
  }, [setIsAuthenticated, navigate]);

  return null; // No renderiza nada, solo maneja la autenticación
};

export default Navigation;
