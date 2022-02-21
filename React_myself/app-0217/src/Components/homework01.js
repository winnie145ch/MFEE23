import './../menu.css';
import { useState } from 'react';

function Active() {
  let element = document.querySelectorAll('li');
  function active() {
    element.classList.add('active');
  }
  function notActive() {
    element.classList.remove('active');
  }
  const click = 1;
  return (
    <>
      <li
        onClick={() => {
          {
            click == 1 ? click-- : click++;
          }
          {
            click == 1 ? notActive() : active();
          }
        }}
      ></li>
    </>
  );
}
export default Active;
