// import logo from './logo.svg';
import { BrowserRouter, Outlet, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import MainNav from './components/MainNav';
import { ToastContainer } from 'react-toastify';
import TokenInterceptor from './utils/TokenInterceptor';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App Container-fluid bg-white'>
              <div className="d-flex flex-column">
        <MainNav/>
      <ToastContainer/>
      <TokenInterceptor/>
      <div>
          <Outlet/>
      </div>
      <Footer/>
      </div>
    </div>
      
  );
}

export default App;
