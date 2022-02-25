import { useEffect, useState, useRef } from 'react';

function FCLifecycle() {
  const [total, setTotal] = useState(0);

  //v3
  const [didMount, setDidMount] = useState(false);

  //v4
  const didMountRef = useRef(false);
//ref可以記錄真實出現在網頁上(真實DOM)後的狀態(出登場)

  //DidMount
  useEffect(() => {
    console.log('didMount');
  }, []);

  //didUpdate+didMount
  useEffect(() => {
    console.log('didMount + didUpdate v1');
  }, [total]);

  //willUnmount
  useEffect(() => {
    return () => {
      console.groupCollapsed('willUnmount');
    };
  }, []);

  //v2
  //didUpdate(用初始值0判斷) 100% 模擬
  useEffect(() => {
    //用初始直0判斷
    if (total !== 0) console.log('didUpdate v2');
  }, [total]);
  //會回到初始值無法判斷出來

  //v3
  //didMount時設置didMount旗標為true
  useEffect(() => {
    setDidMount(true);
  }, []);
  useEffect(() => {
    if (didMount) console.log('didUpdate v3');
  }, [total]);

  // v4
  useEffect(() => {
    if (didMountRef.current) {
        // didUpdate
      console.log('didUpdate v4');
    } else {
      didMountRef.current = true;
    }
  }, [total]);

  return (
    <>
      <h1>{total}</h1>
      <button
        onClick={() => {
          const newTotal = total + 1;
          setTotal(newTotal);
          console.log(newTotal);
        }}
      >
        +1
      </button>
      <button
        onClick={() => {
          const newTotal = total - 1;
          setTotal(newTotal);
          console.log(newTotal);
        }}
      >
        -1
      </button>
    </>
  );
}

export default FCLifecycle;
