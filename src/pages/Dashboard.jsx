import { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Importamos SweetAlert2
import axios from "axios"; // Para hacer las peticiones HTTP
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de importar Bootstrap

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newAssessment, setNewAssessment] = useState(1); // Evaluación por defecto
  const [selectedProductId, setSelectedProductId] = useState(null); // ID del producto seleccionado
  const [loadingProducts, setLoadingProducts] = useState(true); // Estado de carga para productos
  const [loadingComments, setLoadingComments] = useState(false); // Estado de carga para comentarios

  // Obtiene productos al cargar el dashboard
  useEffect(() => {
    // Llama a la API para obtener los productos
    axios.get("http://127.0.0.1:8000/api/v1/products")
      .then(response => {
        setProducts(response.data); // Guardamos los productos
        setLoadingProducts(false); // Cambiar estado de carga
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoadingProducts(false); // Cambiar estado de carga si hay error
      });
  }, []);

  // Obtiene los comentarios de un producto
  const fetchComments = (productId) => {
    console.log(productId);
    setLoadingComments(true); // Iniciar carga de comentarios
    axios.get(`http://127.0.0.1:8000/api/v1/comments/${productId}`)
      .then(response => {
        setComments(response.data); // Guardamos los comentarios
        setLoadingComments(false); // Finaliza carga de comentarios
      })
      .catch(error => {
        console.error("Error fetching comments:", error);
        setLoadingComments(false); // Finaliza carga de comentarios si hay error
      });
  };

  // Envia un nuevo comentario para un producto
  const handleAddComment = () => {
    if (newComment.trim() === "") {
      Swal.fire("Error", "El comentario no puede estar vacío", "error");
      return;
    }

    const newCommentData = {
      comment: newComment,
      assessment: newAssessment, // Evaluación seleccionada
      product_id: selectedProductId,
      user_id: 1, // Suponiendo que el usuario tiene ID 1, puedes ajustarlo según tu sistema
    };

    axios.post("http://127.0.0.1:8000/api/v1/comments", newCommentData)
      .then(response => {
        setNewComment(""); // Limpia el campo de texto
        setNewAssessment(1); // Resetea la evaluación a su valor por defecto
        fetchComments(selectedProductId); // Actualiza la lista de comentarios
        Swal.fire("Éxito", "Comentario agregado correctamente", "success");
      })
      .catch(error => {
        console.error("Error adding comment:", error);
        Swal.fire("Error", "Hubo un problema al agregar el comentario", "error");
      });
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Dashboard de Productos</h1>

      {/* Mostramos lista de productos */}
      <div>
        <h2 className="mb-3">Productos</h2>
        {loadingProducts ? (
          <div>Loading products...</div>
        ) : (
          <div className="row">
            {products.map((product) => (
              <div
                key={product.id}
                className="col-md-4 mb-4"
                onClick={() => {
                  setSelectedProductId(product.id);
                  fetchComments(product.id); // Carga comentarios cuando se selecciona un producto
                }}
              >
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="text-muted">Precio: ${product.price}</p>
                    <p className="text-muted">Cantidad: {product.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sección de comentarios */}
      {selectedProductId && (
        <div className="mt-4">
          <h3>Comentarios sobre el Producto</h3>
          {loadingComments ? (
            <div>Loading comments...</div>
          ) : (
            <div className="list-group mb-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="list-group-item">
                    <p>{comment.comment}</p>
                    <p><strong>Evaluación: </strong>{comment.assessment}</p>
                    <small className="text-muted">
                      Usuario: {comment.username} | Fecha: {new Date(comment.created_at).toLocaleString()}
                    </small>
                  </div>
                ))
              ) : (
                <p>No hay comentarios disponibles para este producto.</p>
              )}
            </div>
          )}

          {/* Formulario para agregar un comentario */}
          <textarea
            className="form-control"
            rows="4"
            placeholder="Deja tu comentario"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          
          {/* Select de evaluación */}
          <div className="mt-2">
            <label>Evaluación: </label>
            <select
              className="form-control"
              value={newAssessment}
              onChange={(e) => setNewAssessment(parseInt(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>

          {/* Select de producto para agregar comentario */}
          <div className="mt-2">
            <label>Selecciona un Producto: </label>
            <select
              className="form-control"
              value={selectedProductId}
              onChange={(e) => {
                setSelectedProductId(parseInt(e.target.value));
                fetchComments(parseInt(e.target.value)); // Actualiza los comentarios del producto seleccionado
              }}
            >
              <option value="">Selecciona un producto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} {/* Mostrar el nombre del producto */}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary mt-3" onClick={handleAddComment}>
            Agregar Comentario
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
