import { useState } from 'react';
import ChildA from './childA';
import ChildB from './childB';

function Parent() {
  const [pData, setPData] = useState('Parent Data');
  //給ChildB設定回資料用的狀態
  const [data, setData] = useState('');
  return (
    <>
      <h2>Parent</h2>
      <p>來自ChildB的資料:{data}</p>
      <ChildB setData={setData} />
      <ChildA pData={pData} />
    </>
  );
}

export default Parent;
