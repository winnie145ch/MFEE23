import { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './pages/Home';
// import About from './pages/Abouts';
// import Contact from './pages/Contact';
import Login from './pages/Login';
import NotFoundPage from './pages/NotFoundPage';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ProductListQS from './pages/ProductListQS';
import ProductDetailQS from './pages/ProductDetailQS';

// 元件
import Menu from './Components/Menu';

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <Router>
      <>
        {/* menu */}
        <Menu />
        {/* 路由表 */}
        <Switch>
          {/* <Route exact path="/about">
            <About />
          </Route>
          <Route path="/about/contact">
            <Contact />
          </Route> */}
          <Route path="/product-list-qs">
            <ProductListQS />
          </Route>
          <Route path="/product-detail-qs">
            <ProductDetailQS />
          </Route>
          <Route path="/product-list">
            <ProductList />
          </Route>
          <Route path="/product-detail/:id">
            <ProductDetail />
          </Route>
          <Route path="/login">
            <Login auth={auth} setAuth={setAuth} />
          </Route>
          <Route exact path="/">
            <Home auth={auth} />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
