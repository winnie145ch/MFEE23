/*import './App.css';

function App() {
  return (
    <>
      <h2>Number</h2>
      {123}
      {123 + 1}
      <h2>Boolean</h2>
      {true}
      {false}
      <h2>String</h2>
      {'abc'}
      {'abc' + 'de'}
      <h2>null/undefined</h2>
      {null}
      {undefined}
      <h2>Array</h2>
      {[1, 2, 'abc', true, null, undefined]}
      <h2>Object</h2>
      {{{ a: 1, b: 2 }} }
      {{new Date()} }
      <h2>Function</h2>
      {() => console.log(123)}
    </>
  );
}
*/

/*import { data } from './data/student';
import students from './data/student.json';

function App() {
  console.log(students);
  console.log(data);

  const newData = data.map((v, i) => {
    return <li>{v.name}</li>;
  });

  console.log(newData);

  return (
    <>
      {data.map((v, i) => {
        return <li key={i}>{v.name}</li>;
      })}
    </>
  );
}

export default App;
*/

// function.js

//parents.js

//socialshare-app.js

// import Parent from './Components/parents0222';

// function App() {
//   return (
//     <>
//       <Parent />
//     </>
//   );
// }

// export default App;

//cart
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
