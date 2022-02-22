import { useState } from 'react';

function ChildB(props) {
  console.log(props);
  const [childBData, setChildBData] = useState('ChildB Data');

  return (
    <>
      <h3>ChildB</h3>
      <button
        onClick={() => {
          props.setData(childBData);
        }}
      >
        資料送回Parent
      </button>
    </>
  );
}
export default ChildB;
