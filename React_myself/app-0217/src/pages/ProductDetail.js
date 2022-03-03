import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { data } from '../data/product';

function ProductDetail(props) {
  const { id } = useParams();

  const product = data.find((v, i) => String(v.id) == String(id));

  return (
    <>
      <h2>ProductDetail</h2>
      {product && (
        <>
          <h3>{product.name}</h3>
          <img src={product.picture} alt="" />
          <p>{product.price}</p>
          <p>{product.tags}</p>
        </>
      )}
      <Link to="/product-list">回產品清單</Link>
    </>
  );
}

export default ProductDetail;
