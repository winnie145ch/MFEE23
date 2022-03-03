import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { data } from '../data/product';

function ProductDetailQS(props) {
  const location = useLocation();
  console.log(Location.search);

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const product = data.find((v, i) => v.id === id);

  return (
    <>
      <h2>ProductDetail - Qoery String</h2>
      {product && (
        <>
          <h3>{product.name}</h3>
          <img src={product.picture} alt="" />
          <p>{product.price}</p>
          <p>{product.tags}</p>
        </>
      )}
      <Link to="/product-list-qs">回產品清單</Link>
    </>
  );
}

export default ProductDetailQS;
