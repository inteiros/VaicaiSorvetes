import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './hooks/auth';
import Routes from './routes';
import GlobalStyle from './styles/global';

const App = () => {
  return (
    <>
      <BrowserRouter>
       <AuthProvider>
        <Routes />
        <GlobalStyle />
       </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
