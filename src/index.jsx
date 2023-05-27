import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { AppProvider } from './Context/ProductContext';
import { FilterContextProvider } from './Context/filter_context';
import { CartProvider } from './Context/cartContext';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-og81mrsl1va1si6k.us.auth0.com"
      clientId="CaTUGg9S5Mo8pITimDuL1yBMQrYNxZuw"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}>

      <AppProvider>
        <FilterContextProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterContextProvider>
      </AppProvider>
    </Auth0Provider>
  </React.StrictMode>
);