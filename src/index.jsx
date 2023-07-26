import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { AppProvider } from './Context/ProductContext';
import { FilterContextProvider } from './Context/filter_context';
import { CartProvider } from './Context/cartContext';
import { FirebaseContextProvider } from './Context/FirebaseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContextProvider>
      <AppProvider>
        <FilterContextProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterContextProvider>
      </AppProvider>
    </FirebaseContextProvider>
  </React.StrictMode>
);