import React from 'react'
import { useNavigate } from 'react-router-dom';
// import notify from '../components/toast.Service';
import { toast } from 'react-toastify';
import axios from 'axios';

function TokenInterceptor() {

    const navigate = useNavigate();

    // Adds an interceptor to the httpClient to send the token with every request.
    axios.interceptors.request.use(
        function (request) {
            const token = localStorage.getItem('token');

            if(!token){
                return request;
            }

            request.headers.Authorization = `Bearer ${token}`; 
            return request;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        function (response) {
            console.log(response);
           return response;
        },
        function (error) {
            console.log("error from backend TI",error)
            // console.log('From interceptor', error);
            if (error.response.status === 401) {
                navigate('/');
            }
            if (error.response.status === 404) {
                toast.error("Page not found", {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            if (error.response.status === 500) {
                var title = error.response.data.title;

                if(title){
                    toast.error(title, {
                        position: toast.POSITION.TOP_RIGHT
                      });
                    return;
                }
            }
            if(error.response.status === 400){
                var title1 = error.response.data.title;

                if(title1){
                    toast.success(error.response.data.title, {
                        position: toast.POSITION.TOP_RIGHT
                      });
                    console.log("title error",title1);
                    return;
                }

                Object.values(error.response.data).forEach(value=>{
                    value.forEach(e=>{
                        console.log(e)  
                    })
                });
                return Promise.reject(error);
            }
        }
    );
    return (
        <></>
    )
}

export default TokenInterceptor