import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { data } from '../data/product';

function ProductListQS(props) {
  return (
    <>
      <h2>ProductList - Query String</h2>
      <ul>
        {data.map((v, i) => {
          return (
            <li key={i}>
              <Link to={`/product-detail-qs?id=${v.id}`}>{v.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ProductListQS;
