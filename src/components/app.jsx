import React from 'react';
import { Helmet } from 'react-helmet';
import Header from './layout/header';
import Main from './layout/main';
import Footer from './layout/footer';
import '../styles/main.scss';

export default () => (
  <div>
    <Helmet>
      <title>React Babel Webpack Boilerplate</title>
      <meta
        name="description"
        content="A small, but perfectly formed boilerplate for React projects."
      />
    </Helmet>
    <Header />
    <Main />
    <Footer />
  </div>
);
