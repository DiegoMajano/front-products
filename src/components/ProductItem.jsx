import "../styles/Product.css";
export const ProductItem = ({ product, onEdit, onAdd, onDelete }) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p className="price">💰 ${product.price.toFixed(2)}</p>
      <p className="quantity">📦 Stock: {product.quantity}</p>

      {/* Botones de acción */}
      <div className="buttons">
        <button className="edit-btn" onClick={() => onEdit(product)}>
          Editar
        </button>
        <button className="add-btn" onClick={() => onAdd(product)}>
          Agregar
        </button>
        <button className="delete-btn" onClick={() => onDelete(product)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};
