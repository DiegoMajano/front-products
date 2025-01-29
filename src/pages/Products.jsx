import React from "react";
import { ProductItem } from "../components/ProductItem";
import "../styles/Product.css";

export const Products = ({ products }) => {
  return (
    <>
      <h2 className="title-product">Productos</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
