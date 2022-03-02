import React from 'react';
import PropTypes from 'prop-types';

function Home(props) {
  const { auth } = props;
  return (
    <>
      <div>Home</div>
      {auth ? '已登入' : '未登入'}
    </>
  );
}

Home.propTypes = {};

export default Home;
