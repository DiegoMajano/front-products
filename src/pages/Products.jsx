import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Products = () => {
  const [products, setProducts] = useState([]);

  // Función para editar un producto
  const onEdit = (product) => {
    Swal.fire({
      title: "Editar Producto",
      html: `
        <input id="product-name" class="swal2-input" placeholder="Nombre del Producto" value="${product.name}" />
        <input id="product-description" class="swal2-input" placeholder="Descripción" value="${product.description}" />
        <input id="product-price" class="swal2-input" placeholder="Precio" type="number" value="${product.price.toFixed(2)}" />
        <input id="product-quantity" class="swal2-input" placeholder="Cantidad" type="number" value="${product.quantity}" />
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar Cambios",
      preConfirm: async () => {
        const name = document.getElementById("product-name").value;
        const description = document.getElementById("product-description").value;
        const price = parseFloat(document.getElementById("product-price").value).toFixed(2);
        const quantity = parseInt(document.getElementById("product-quantity").value, 10);

        const token = localStorage.getItem("token");

        try {
          const response = await axios.patch(`http://127.0.0.1:8000/api/v1/products/${product.id}`, {
            name,
            description,
            price,
            quantity
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });

          if (response.status === 200) {
            const updatedProduct = response.data;
            setProducts((prevProducts) => prevProducts.map((prod) =>
              prod.id === updatedProduct.id ? updatedProduct : prod
            ));
            return true;
          } else {
            throw new Error("No se pudo actualizar el producto");
          }
        } catch (error) {
          Swal.showValidationMessage(`Error: ${error.message}`);
          return false;
        }
      }
    });
  };

  // Función para agregar un nuevo producto
  const onAdd = () => {
    Swal.fire({
      title: "Nuevo Producto",
      html: `
        <input id="new-product-name" class="swal2-input" placeholder="Nombre del Producto" />
        <input id="new-product-description" class="swal2-input" placeholder="Descripción" />
        <input id="new-product-price" class="swal2-input" placeholder="Precio" type="number" />
        <input id="new-product-quantity" class="swal2-input" placeholder="Cantidad" type="number" />
      `,
      showCancelButton: true,
      confirmButtonText: "Agregar Producto",
      preConfirm: async () => {
        const name = document.getElementById("new-product-name").value;
        const description = document.getElementById("new-product-description").value;
        const price = parseFloat(document.getElementById("new-product-price").value).toFixed(2);
        const quantity = parseInt(document.getElementById("new-product-quantity").value, 10);

        const token = localStorage.getItem("token");

        try {
          const response = await axios.post("http://127.0.0.1:8000/api/v1/products", {
            name,
            description,
            price,
            quantity
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });

          if (response.status === 201) {
            const newProduct = response.data;
            setProducts((prevProducts) => [...prevProducts, newProduct]);
            return true;
          } else {
            throw new Error("No se pudo agregar el producto");
          }
        } catch (error) {
          Swal.showValidationMessage(`Error: ${error.message}`);
          return false;
        }
      }
    });
  };

  // Función para eliminar un producto
  const onDelete = (product) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará el producto: ${product.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      preConfirm: async () => {
        const token = localStorage.getItem("token");

        try {
          const response = await axios.delete(`http://127.0.0.1:8000/api/v1/products/${product.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.status === 200) {
            setProducts((prevProducts) => prevProducts.filter((prod) => prod.id !== product.id));
            return true;
          } else {
            throw new Error("No se pudo eliminar el producto");
          }
        } catch (error) {
          Swal.showValidationMessage(`Error: ${error.message}`);
          return false;
        }
      }
    });
  };

  // Cargar productos desde la API al cargar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/products", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setProducts(response.data);
        } else {
          console.error("Error obteniendo productos");
        }
      } catch (error) {
        console.error("Error de conexión con la API", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Productos</h1>
      <button className="btn btn-primary btn-sm" onClick={onAdd}>
                    Agregar Nuevo Producto
                  </button>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              {product.image_url && (
                <div className="d-flex justify-content-center">
                  <img
                    src={product.image_url}
                    className="card-img-top img-fluid"
                    alt={product.name}
                    style={{ maxWidth: '150px', height: 'auto' }}
                  />
                </div>
              )}
              <div className="card-body">
                <h5 className="card-title text-primary">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text fw-bold">💰 ${product.price.toFixed(2)}</p>
                <p className="card-text text-muted">📦 Stock: {product.quantity}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-success" onClick={() => onEdit(product)}>
                    Editar
                  </button>
                  
                  <button className="btn btn-danger" onClick={() => onDelete(product)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
