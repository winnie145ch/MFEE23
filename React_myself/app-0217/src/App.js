import './App.css';
import OrderList from './Components/Cart/OrderList';
import Summary from './Components/Cart/Summary';
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Brown T-shirt',
    categroy: 'Shirt',
    image: 'https://i.imgur.com/1GrakTl.jpg',
    price: 300,
  },
];

function App() {
  const [count, setCount] = useState(1);
  // 在購物車中至少會買一件上品
  return (
    <>
      <div className="card">
        <div className="row">
          <OrderList products={products} count={count} setCount={setCount} />
          <Summary totalNumber={count} totalPrice={count * products[0].price} />
        </div>
      </div>
    </>
  );
}

export default App;
