import { useEffect, useState } from 'react';
import '../pages/Cart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TrashFill } from 'react-bootstrap-icons';
import { setSecNavbar } from '../utils/tokenHelper';
import CartSum from '../components/CartSum';
import { toast } from 'react-toastify';

function Cart() {
  const navigate = useNavigate();
  setSecNavbar(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [buyNow, setBuyNow] = useState([]);
  const [buyLater, setBuyLater] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [initialSum, SetInitialSum] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0)
  const cartLength = cartProducts.length;
  useEffect(() => {
    getCartItems();
  }, []);
  const getCartItems = () => {
    axios.get('https://localhost:7258/api/Cart/UserCart')
      .then(res => {
        console.log("cart  ", res);
        setCartProducts(res.data);
        const filteredItems = res.data;
        if(!filteredItems){
          toast.warning('Add products to your cart to view them', {
            position: toast.POSITION.TOP_CENTER
          });
        }
        console.log("cartproducts bhdihicv", filteredItems);
        const BuyLater = filteredItems.filter((product) => product.status === 2);
        setBuyLater(BuyLater);
        console.log("buy later ", BuyLater);
        const BuyNow = filteredItems.filter((product) => product.status === 1);
        setBuyNow(BuyNow);
        console.log("buy now ", BuyNow);
        var initialSampleSum = 0;
        const productQuantity = [];
        BuyNow.map(item => {
          return (
            <>
              {initialSampleSum += item.product.price}
              {productQuantity.push(1)}
            </>
          );
        })
        SetInitialSum(initialSampleSum);
        setQuantity(productQuantity);
        setTotalPrice(initialSampleSum)
        console.log("initial quantity", productQuantity);
      })
      .catch(err => {
        console.log("error", err);
      })
  }


  const backToHome = () => {
    navigate('/home');
  }

  const deleteCartItems = async (id) => {
    console.log("cart id", id);
    console.log("type of cart id", typeof (id));
    if (!window.confirm('Are you sure to delete this record?')) {
      console.log("deleting");
      return;
    }
    else {
      await axios.delete(`https://localhost:7258/api/Cart/${id}`)
        .then((res) => {
          console.log("deleted item successfully", res);
          toast.success('Product removed from your cart', {
            position: toast.POSITION.TOP_CENTER
          });
          getCartItems();
        })
        .catch((err) => {
          console.log("deletion failed", err);
        })
    }
  }

  const calculateSubTotal = (index, qty, price) => {
    const total = totalPrice;
    console.log("price now after subtraction", total);
    const newQuantity = quantity;
    if (qty >= quantity[index]) {
      console.log("qauantity array value asc", quantity[index]);
      console.log("target value", qty);
      const subTotal = total + price;
      console.log("sub price after asc", subTotal);
      setTotalPrice(subTotal);
    }
    else {
      console.log("qauantity array value desc", quantity[index]);
      console.log("target value", qty);
      const subTotal = totalPrice - price;
      console.log("sub price after desc", subTotal);
      setTotalPrice(subTotal);
    }
    newQuantity.splice(index, 1, qty);
    setQuantity(newQuantity);
  }

  const UpdateCart = async (id) => {
    try {
      await axios.put(`https://localhost:7258/api/Cart/${id}`)
        .then(res => {
          console.log("updation success", res);
          setQuantity(res.data.result.quantity);
          getCartItems();
        })
    }
    catch (err) {
      console.log("updation failed", err)
    }
  }

  return (
    <>
      <section className="h-100 h-custom bg-light" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            {cartProducts.length >= 1 ? (<>
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

                        {buyNow && buyNow.map((item, index) => {
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
                                      <h5>{item.product.name}</h5>type of status {typeof (item.status)}
                                      <p className="small mb-0">{item.product.category.name}</p>
                                    </div>
                                  </div>
                                  <div className="d-flex flex-row align-items-center">
                                    <div className='' style={{ width: "50px" }}>
                                      <div className="form-outline" style={{ width: "3rem" }}>
                                        <input min="1" max="20" type="number" id="typeNumber" defaultValue='1' className="form-control" onChange={(e) => { calculateSubTotal(index, e.target.value, item.product.price) }} />

                                      </div>
                                    </div>
                                    <div style={{ width: "80px" }}>
                                      <h5 className="mb-0">${item.product.price}</h5>
                                    </div>
                                    <form>
                                      <button type='button' className='btn btn-outline-dark' onClick={() => { deleteCartItems(item.id) }}><TrashFill /></button>
                                      <button type='button' className='btn btn-outline-dark' onClick={() => { UpdateCart(item.id) }}>Buy Later</button>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })
                        }

                      </div>
                      {totalPrice === 0 ? <CartSum sum={initialSum} quantity={quantity}/> : <CartSum sum={totalPrice} quantity={quantity}/>}

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-7">
                      <h3 className="mb-3"><a href="#!" className="text-body"><i
                        className="fas fa-long-arrow-alt-left me-2"></i>Buy Later</a></h3>
                      <hr></hr>


                      {buyLater && buyLater.map((item, index) => {
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
                                    <h5>{item.product.name}</h5>index {index}
                                    <p className="small mb-0">{item.product.category.name}</p>
                                  </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                  <div className='' style={{ width: "50px" }}>
                                    <div className="form-outline" style={{ width: "3rem" }}>
                                      <input min="1" max="20" type="number" id="typeNumber" defaultValue={item.quantity} className="form-control" onChange={(e) => { calculateSubTotal(index, (e.target.value * item.product.price)) }} />

                                    </div>
                                  </div>
                                  <div style={{ width: "80px" }}>
                                    <h5 className="mb-0">${item.product.price}</h5>
                                  </div>
                                  <button type='button' className='btn btn-outline-dark' onClick={() => { deleteCartItems(item.id) }}><TrashFill /></button>
                                  <button type='button' className='btn btn-outline-dark' onClick={() => { UpdateCart(item.id) }}>Buy Now</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                      }

                    </div>

                  </div>
                </div>
              </div>
            </>) : (<>
              <div className="col">
                <div className="card">
                  <div className="card-body p-4">
              <div className="row">
                <div className="card bg-light text-dark rounded-3">
                  <div className="card-body">
                <h2 className="mb-3"><i>No products added to the cart yet!</i></h2>
                    <button type='button' className='btn btn-secondary btn-md' onClick={backToHome}>
                      Back to home
                    </button>
                  </div>
                </div>
              </div>
              </div>
              </div>
              </div>
            </>)}
          </div>
        </div>
      </section>
    </>
  )
}

export default Cart;