import React from 'react';
import { useHistory } from 'react-router-dom';

function Login(props) {
  const { auth, setAuth } = props;

  let history = useHistory();
  return (
    <>
      <div>Login</div>
      {auth ? '已登入' : '未登入'}
      <button
        onClick={() => {
          setAuth(!auth);
          alert('welcome! 幫您轉至首頁');
          //轉至首頁
          history.push('/');
        }}
      >
        {auth ? '登出' : '請登入'}
      </button>
      <br />
      <button
        onClick={() => {
          history.goBack();
        }}
      >
        上一頁
      </button>
    </>
  );
}

export default Login;
