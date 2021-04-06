import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FoodsProvider } from './hooks/useFoods';
// import { FoodsProvider } from './hooks/useFoods';

ReactDOM.render(
  <React.StrictMode>
    <FoodsProvider >
    <App />
    </FoodsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
