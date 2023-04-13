// import logo from './logo.svg';
import { BrowserRouter, Outlet, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import MainNav from './components/MainNav';
import { ToastContainer } from 'react-bootstrap';
import TokenInterceptor from './utils/TokenInterceptor';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App Container'>
        <MainNav/>
      <ToastContainer/>
      <TokenInterceptor/>
      <div className='container-fluid'>
          <Outlet/>
      </div>
      <Footer/>
    </div>
      
 
  );
}

export default App;
