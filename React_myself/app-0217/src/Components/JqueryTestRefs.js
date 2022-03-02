import { useState, useEffect, useRef } from 'react';
import $ from 'jquery';

function JQueryTestRefs(props) {
  const [total, setTotal] = useState(0);

  const titleRef = useRef();
  const buttonRef = useRef();
  const inputRef = useRef();

  //didMount+didUpdate
  useEffect(() => {
    //jquery
    // console.log($(titleRef.current).text());

    //移除原事件
    // $(buttonRef.current).off('click');

    //加入新事件
    $(buttonRef.current).on('click', () => {
      alert('目前輸入值' + $(inputRef.current).val());
      setTotal(Number($(inputRef.current).val()));
    });
  }, []);

  return (
    <>
      <h1 ref={titleRef}>Raccos</h1>
      {/* 不可控 */}
      <input type="text" ref={inputRef} defaultValue={total} />
      <button ref={buttonRef}>Set States</button>
      <h1 onClick={() => setTotal(total + 1)}>{total}</h1>
    </>
  );
}

export default JQueryTestRefs;
