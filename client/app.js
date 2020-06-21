import React from 'react';

import {MainNavbar, Footer} from './components';
import Routes from './routes';

const App = () => {
  return (
    <div>
      <MainNavbar />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
