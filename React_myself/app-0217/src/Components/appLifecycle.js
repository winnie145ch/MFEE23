import React, { useState, useEffect } from 'react';
// import CCLifecycle from './Components/CCliffecycle';
import FCLifecycle from './Components/FClifecycle';

function App() {
  const [alive, setAlive] = useState(true);

  return (
    <>
      {alive && <FCLifecycle />}
      <button
        onClick={() => {
          setAlive(!alive);
        }}
      >
        {alive ? 'bye' : 'appear'}
      </button>
    </>
  );
}

export default App;
