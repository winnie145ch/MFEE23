import React from 'react';
import { Link } from 'react-router-dom';
import { data } from '../data/product';

function ProductList(props) {
  return (
    <>
      <h2>ProductList</h2>
      <ul>
        {data.map((v, i) => {
          return (
            <li key={i}>
              <Link to={'/product-detail/' + v.id}>
                {v.name}/{v.price}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ProductList;
