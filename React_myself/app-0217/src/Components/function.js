import { useState } from 'react';

function FC() {
  const [total, setTotal] = useState(0);

  return (
    <>
      <h1 onClick={() => setTotal(total + 1)}>{total}</h1>
      {/* {total && <p>總數大於0</p>} */}
      {total > 0 && <p>總數大於0</p>}
      {total > 0 ? <p>總數大於0</p> : ''}
    </>
  );
}
export default FC;