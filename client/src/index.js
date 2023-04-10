import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-bootstrap';
import MainNav from './components/MainNav';
import Footer from './components/Footer';
import TokenInterceptor from './utils/TokenInterceptor';
import { RouterProvider, Routes } from 'react-router-dom';
import routes from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  {/* <NavigationBar/> */}
  <RouterProvider router={routes}>
        </RouterProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();