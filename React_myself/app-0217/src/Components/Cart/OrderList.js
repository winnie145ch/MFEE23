import React from 'react';
import ProductItem from './ProductItem';

// const products = [
//   {
//     id: 1,
//     name: 'Brown T-shirt',
//     categroy: 'Shirt',
//     image: 'https://i.imgur.com/1GrakTl.jpg',
//     price: 300,
//   },
//   {
//     id: 2,
//     name: 'Black T-shirt',
//     categroy: 'Shirt',
//     image: 'https://i.imgur.com/1GrakTl.jpg',
//     price: 400,
//   },
// ];

function OrderList(props) {
  const { products, count, setCount } = props;
  return (
    <>
      <div className="col-md-8 cart">
        <div className="title">
          <div className="row">
            <div className="col">
              <h4>
                <b>Shopping Cart</b>
              </h4>
            </div>
          </div>
        </div>
        {products.map((product, i) => {
          const { id, name, category, image, price } = product;

          return (
            <ProductItem
              key={id}
              id={id}
              name={name}
              categroy={category}
              image={image}
              price={price}
              count={count}
              setCount={setCount}
            />
          );
        })}
        <div className="back-to-shop">
          <a href="#/">&#8592;</a>
          <span className="text-muted">Back to shop</span>
        </div>
      </div>
    </>
  );
}

export default OrderList;
