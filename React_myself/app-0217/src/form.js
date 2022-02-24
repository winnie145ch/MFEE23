import { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [textArea, setTextArea] = useState('');

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
    </>
  );
}

export default App;
