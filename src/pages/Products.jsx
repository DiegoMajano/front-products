import React from "react";
import "../styles/Product.css";
import { useEffect, useState } from "react";
const Products = () => {
  const [products, setProducts] = useState([]);
  // Función para editar el producto
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
          const price = parseFloat(document.getElementById("product-price").value).toFixed(2); // Redondeamos el precio a dos decimales
          const quantity = parseInt(document.getElementById("product-quantity").value, 10);
  
          const token = localStorage.getItem("token");
          console.log("Token: ", token);  // Verifica que el token sea correcto
  
          // Realizamos la petición PATCH para actualizar el producto
          try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/products/${product.id}`, {
              method: "PATCH",
              headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ name, description, price, quantity }),
            });
  
            if (response.ok) {
              const updatedProduct = await response.json();
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
          const price = parseFloat(document.getElementById("new-product-price").value).toFixed(2); // Redondeamos el precio
          const quantity = parseInt(document.getElementById("new-product-quantity").value, 10);
  
          const token = localStorage.getItem("token");
          console.log("Token: ", token);  // Verifica que el token sea correcto
  
          try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/products", {
              method: "POST",
              headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ name, description, price, quantity }),
            });
  
            if (response.ok) {
              const newProduct = await response.json();
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
  
    // Función para eliminar el producto
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
          console.log("Token: ", token);  // Verifica que el token sea correcto
  
          try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/products/${product.id}`, {
              method: "DELETE",
              headers: {
                "Authorization": `Bearer ${token}`,
              },
            });
  
            if (response.ok) {
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
 useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/products", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
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
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              {product.image_url && (
                <img
                  src={product.image_url}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title text-primary">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text fw-bold">
                  💰 ${product.price.toFixed(2)}
                </p>
                <p className="card-text text-muted">
                  📦 Stock: {product.quantity}
                </p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-success"
                    onClick={() => onEdit(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={onAdd}
                  >
                    Agregar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(product)}
                  >
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
