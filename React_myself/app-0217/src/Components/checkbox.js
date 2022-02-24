import React from 'react';

function Checkbox(props) {
  const { value, checkedValueList, setCheckedValueList, ...otherProps } = props;
  //otherProps是指其它的屬性物件值，ex. css classname...etc

  const handleChange = (e) => {
    if (checkedValueList.includes(e.target.value)) {
      const newLikeList = checkedValueList.filter((v, i) => {
        return v !== e.target.value;
      });
      setCheckedValueList(newLikeList);
    } else {
      const newLikeList = [...checkedValueList, e.target.value];
      setCheckedValueList(newLikeList);
    }
  };
  return (
    <>
      <input
        type="checkbox"
        value={value}
        checked={checkedValueList.includes(value)}
        onChange={handleChange}
        {...otherProps}
      />
      <label>{value}</label>
    </>
  );
}

export default Checkbox;
