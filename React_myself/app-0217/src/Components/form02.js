import { useState } from 'react';
import Checkbox from './Components/checkbox';
import RadioButton from './Components/radiobutton';

function App() {
  const [inputText, setInputText] = useState('');
  const [textArea, setTextArea] = useState('');

  //radio group
  const [radioValue, setRadioValue] = useState('');
  const foodOptions = ['牛肉麵', '蚵仔煎', '大雞排'];

  //radio - 專用元件
  const [gender2, setGender2] = useState('');
  const genderOptions = ['male', 'female', 'other'];

  //select
  const [selectedValue, setSeletedValue] = useState('');

  //checkbox single
  const [agree, setAgree] = useState(false);

  //checkbox group
  const [likeList, setLikeList] = useState([]);
  const fruitOptions = ['watermelon', 'mango', 'orange'];

  //checkbox 專用元件
  const [likeList2, setLikeList2] = useState([]);
  const fruitOptions2 = ['cherry', 'plum', 'apple', 'banana'];

  return (
    <>
      <h1>可控表單元素</h1>
      <h3>文字輸入框Input</h3>
      <input
        type="text"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      <h3>文字輸入區域Textarea</h3>
      <textarea
        value={textArea}
        onChange={(e) => {
          setTextArea(e.target.value);
        }}
      />
      <h3>按鈕群組</h3>
      {foodOptions.map((v, i) => {
        return (
          <div key={i}>
            <input
              type="radio"
              value={v}
              id={'foodOption' + i}
              checked={v === radioValue}
              onChange={(e) => {
                setRadioValue(e.target.value);
              }}
            />
            <label htmlFor={'foodOption' + i}>{v}</label>
          </div>
        );
      })}
      <h3>下拉選單</h3>
      <label htmlFor="cars"></label>
      <select
        name="cars"
        id="cars"
        value={selectedValue}
        onChange={(e) => {
          setSeletedValue(e.target.value);
        }}
      >
        <option value="">請選擇</option>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>
      <h3>核取方塊single</h3>
      <input
        type="checkbox"
        checked={agree}
        onChange={(e) => {
          setAgree(e.target.checked);
        }}
      />
      <label>我同意會員註冊條款</label>
      <h3>核取方塊single</h3>
      <p>選擇你喜歡的水果</p>
      {fruitOptions.map((v, i) => {
        return (
          <div key={i}>
            <input
              type="checkbox"
              value={v}
              checked={likeList.includes(v)}
              onChange={(e) => {
                //先判斷是否有在狀態陣列中
                const inState = likeList.includes(e.target.value);
                if (inState) {
                  //if 在陣列中 -> 移除
                  const newLikeList = likeList.filter(
                    (v, i) => v !== e.target.value
                  );
                  setLikeList(newLikeList);
                } else {
                  //else  -> 加入陣列
                  const newLikeList = [...likeList, e.target.value];
                  setLikeList(newLikeList);
                }
              }}
            />
            <label>{v}</label>
          </div>
        );
      })}
      <h3>選項按鈕(專用)</h3>
      {genderOptions.map((v, i) => {
        return (
          <RadioButton
            key={i}
            value={v}
            checkedValue={gender2}
            setCheckedValue={setGender2}
          />
        );
      })}
      <h3>多個核取方塊(專用元件)</h3>
      {fruitOptions2.map((v, i) => {
        return (
          <Checkbox
            key={i}
            value={v}
            checkedValueList={likeList2}
            setCheckedValueList={setLikeList2}
          />
        );
      })}
    </>
  );
}

export default App;
