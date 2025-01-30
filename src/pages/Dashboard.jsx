import React from "react";
import { useNavigate } from "react-router-dom";
import { Products } from "./Products";

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

const Dashboard = () => {
  return (
    <div className="container mt-4">
      {/* Encabezado */}
      <div className="text-center">
        <h1 className="display-4 text-primary">Bienvenido al Dashboard</h1>
        <p className="lead text-muted">
          Aquí puedes administrar tus productos, ver reportes y más.
        </p>
      </div>

      {/* Sección de productos */}
      <Products products={products} />
    </div>
  );
};

export default Dashboard;
