import React from 'react';

function CheckBox(props) {
  const { value } = props;

  return (
    <>
      <input type="checkbox" {...props} />
      {/* {...props} 意思是所有的得到的屬性都設定到input中  */}
      <label>{value}</label>
    </>
  );
}

export default CheckBox;
