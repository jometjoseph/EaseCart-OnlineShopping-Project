import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getSecNavbar, getToken, setSecNavbar, setToken } from '../utils/tokenHelper';
import { ToastContainer } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import login from '../images/login.jpg';
import httpClient from '../utils/httpClient';
import { toast } from 'react-toastify';
import MainNav from '../components/MainNav';

// const axios = require('axios');

const schema = yup.object().shape({
  email: yup
    .string()
    .required('* UserName is required'),
  password: yup
    .string()
    .min(8, '* Password not valid')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      '* invalid password'
    )
    .required('* Password is required')
});

function Login() {
  setSecNavbar(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  // const [user, setUserName] = useState("");
  // const [pass, setPassword] = useState("");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
//   notify("You need to login to view products").info();
 
  const onSubmit = async data => {
    console.log("data is",data);
    await axios.post('https://localhost:7258/login', data)
    .then(res =>{
        console.log("login succesfull", res.data.result);
        setToken(res.data.result);
        const token = getToken();
          console.log("token stored is ", token);
          // console.log('Login successful!');
          toast.success('logged in successfully', {
            position: toast.POSITION.TOP_CENTER
          });
          if(token){
            navigate('/home');
          }
    })
    .catch(err => {
        console.log("login failed",err);
    })
}
  return (
    <div>
      {/* <ToastContainer /> */}
      { error &&
      // <ToastContainer />
        <></>
      }
      <section className="h-100 gradient-form">
        <ToastContainer/>
        <div className="container py-4">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-xl-9">
              <div className="card rounded-4 text-black">
                <div className="row g-0">
                  <div className="col-lg-5 d-flex justify-content-center align-items-center"> 
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center text-dark">
                        <h4 className="mt-1 mb-5 pb-1">Shopping Cart</h4>
                      </div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='text-center text-dark mb-5'>Please login to your account</div>

                        <div className="form-outline mb-3">
                          <input type="text" id="form2Example11" className="form-control"
                            placeholder="username"
                            {...register("email", { required: true, maxLength: 50 })} />
                          <div id='UserNameHelp' className='form-text text-danger'>{errors.username?.message}</div>
                        </div>

                        <div className="form-outline mb-3">
                          <input type="text" id="form2Example22" className="form-control"
                            placeholder="password"
                            {...register("password", { required: true, maxLength: 50 })}
                          />
                          <div id='passwordHelp' className='form-text text-danger'>{errors.password?.message}</div>
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button className="btn btn-primary btn-md" type="submit">Login</button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <img className='img-fluid' src={login} alt='' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login;

// "username":"hbingley1","password":"CQutx25i8r"