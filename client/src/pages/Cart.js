import { useEffect, useState } from 'react';
import '../pages/Cart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  Trash3Fill, TrashFill } from 'react-bootstrap-icons';
import { setSecNavbar } from '../utils/tokenHelper';

function Cart() {
  const navigate = useNavigate();
  setSecNavbar(false);
  const [cartProducts, setCartProducts] = useState([]);
  // var showSubTotal = false;
  // var [subTotal,setSubTotal] = useState([]);
  const subTotal = [];
  const cartLength = cartProducts.length;
  useEffect(() => {
    getCartItems();
    
  }, []);
  const getCartItems = async () => {
    axios.get('https://localhost:7258/api/Cart/UserCart')
      .then(res => {
        console.log("profile ", res);
        setCartProducts(res.data);
      })
      .catch(err => {
        console.log("error", err);
      })
  }


  const backToHome = () => {
    navigate('/home');
  }

  const deleteCartItems = async (id) =>{
    console.log("cart id",id);
    console.log("type of cart id",typeof(id));
    if(!window.confirm('Are you sure to delete this record?')) 
    {
      console.log("deleting");
      return;
    }
    else{
        await axios.delete(`https://localhost:7258/api/Cart/${id}`)
         .then((res) => {
           console.log("deleted item successfully",res);
           getCartItems();
         })
         .catch((err) => {
         console.log("deletion failed",err);
       })
    }
  }

  return (
    <>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">

                  <div className="row">

                    <div className="col-lg-7">
                      <h5 className="mb-3"><a href="#!" className="text-body"><i
                        className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</a></h5>
                      <hr></hr>

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                          <p className="mb-0">You have {cartLength} items in your cart</p>
                        </div>
                        <div>
                          <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!"
                            className="text-body">price <i className="fas fa-angle-down mt-1"></i></a></p>
                        </div>
                      </div>
                      {cartProducts && cartProducts.forEach(item => {
                        return (
                          <>
                            {subTotal.push(item.product.price)}
                          </>
                        );

                      })}

                      {cartProducts && cartProducts.map((item, index) => {
                        return (
                          <div className=" card mb-3" key={index}>
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                  <div>
                                    <img
                                      src={item.product.imageUrl}
                                      className="img-fluid rounded-3" alt="Shopping item" style={{ width: "65px" }} />
                                  </div>
                                  <div className="ms-3">
                                    <h5>{item.product.name}</h5>
                                    <p className="small mb-0">{item.product.category.name}</p>
                                  </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                  <div className='' style={{ width: "50px" }}>
                                    {/* <h5 className="fw-normal mb-0">2</h5> */}
                                    <div class="form-outline" style={{ width: "3rem" }}>
                                      <input min="1" max="20" type="number" id="typeNumber" placeholder='1' class="form-control" />
                                    </div>
                                  </div>
                                  <div style={{ width: "80px" }}>
                                    <h5 className="mb-0">${item.product.price}</h5>
                                  </div>
                                  <button type='button' className='btn btn-outline-dark' onClick={() =>{deleteCartItems(item.id)}}><TrashFill/></button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                      }



                    </div>
                    <div className="col-lg-5">

                      <div className="card bg-light text-dark rounded-3">
                        <div className="card-body">
                          <h3>Checkout</h3>
                          <hr className="my-4" />

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">${Math.round(subTotal.reduce((partialSum, a) => partialSum + a, 0))}.00</p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping</p>
                            <p className="mb-2">$20.00</p>
                          </div>

                          <div className="d-flex justify-content-between mb-4">
                            <p className="mb-2">Total(Incl. taxes)</p>
                            <p className="mb-2">${Math.round(subTotal.reduce((partialSum, a) => partialSum + a, 0) + 20)}.00</p>
                          </div>

                          <button type="button" className="btn btn-info btn-block btn-lg">
                            <div className="d-flex justify-content-between">
                              <span>${Math.round(subTotal.reduce((partialSum, a) => partialSum + a, 0) + 20)}.00</span>
                              <span>Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                            </div>
                          </button>
                          <button type='button' className='btn btn-secondary btn-lg' onClick={backToHome}>
                            Back to home
                          </button>

                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cart;