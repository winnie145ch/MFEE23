import { useEffect } from 'react';
import $ from 'jquery';

function JQueryTest(props) {
  //didMount
  useEffect(() => {
    //jquery
    console.log($('#title').text());
    $('#one').on('click', () => alert('Hello' + $('#title').text()));
  }, []);
  return (
    <>
      <h1 id="title">Raccos</h1>
      <button id="one">Click</button>
    </>
  );
}

export default JQueryTest;
