import "../styles/Product.css";
export const ProductItem = ({ product, onEdit, onAdd, onDelete }) => {
  return (
    <div className="col-md-4">
      <div className="card shadow-sm">
        {/* Título del producto */}
        <div className="card-body">
          <h5 className="card-title text-primary">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <p className="card-text fw-bold">💰 ${product.price.toFixed(2)}</p>
          <p className="card-text text-muted">📦 Stock: {product.quantity}</p>

          {/* Botones de acción */}
          <div className="d-flex  justify-content-between">
            <button
              className="btn btn-success bi bi-pencil-square"
              onClick={() => onEdit(product)}
            >
              Editar
            </button>
            <button
              className="btn btn-primary  bi bi-file-earmark-plus "
              onClick={() => onAdd(product)}
            >
              Agregar
            </button>
            <button
              className="btn btn-danger  bi bi-calendar-x"
              onClick={() => onDelete(product)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
