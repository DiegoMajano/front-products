import { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Importamos SweetAlert2

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Dashboard de Productos</h1> 
    </div>
  );
};

export default Dashboard;
