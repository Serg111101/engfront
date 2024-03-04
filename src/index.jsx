import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { store } from './store';
import App from './App';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './hooks/AdminHooks/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render( 
<Provider store={store}>
  <AuthProvider>
<Router>
  <App />
</Router>
</AuthProvider>
</Provider>
);
