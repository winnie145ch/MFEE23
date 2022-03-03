import React from 'react';
import { Link } from 'react-router-dom';

function Menu(props) {
  return (
    <div>
      {/* <h2> a href </h2>
      <a href="/">首頁</a>
      <br />
      <a href="/login">登入</a>
      <hr />
      <h2>Link to</h2> */}
      <Link to="/">首頁</Link>
      <br />
      <Link to="/product-list">購買清酒(URL Params)</Link>
      <br />
      <Link to="/product-list-qs">購買清酒(Query String)</Link>
      <br />
      <Link to="/login">會員中心</Link>
    </div>
  );
}

export default Menu;
