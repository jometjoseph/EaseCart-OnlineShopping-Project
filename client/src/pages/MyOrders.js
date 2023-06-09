import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { errorAlert } from "../components/SweetAlert";

function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () =>{
    try {
      axios.get("https://localhost:7258/api/Order/User/Orders").then((res) => {
        console.log("Orders made by user", res.data.result);
        setMyOrders(res.data.result);
      });
    } catch (err) {
      console.log("Error while fetching", err);
    }
  }

  const cancelOrder = async (id,item) => {
    // const status = 2;
    const cancelAlert =  errorAlert("Are you sure to Cancel the purchase of `"+item+"` ?",'warning',"Order cancelled");
    cancelAlert.then(async (res) => {
      if (!res){
        console.log("cancelled the action");
        return;
      }
      else { 
        try{
          await axios.put(`https://localhost:7258/api/Order/${id}`)
          .then(res => {
            console.log("result of cancelling order",res);
            toast.success("Order cancelled", {
              position: toast.POSITION.TOP_CENTER,
            });
            getOrders();
          })

        }
        catch(err){
          console.log("error while canceling order",err);
        }
      }
    })
    // if (!window.confirm("Are you sure to Cancel the purchase of `"+item+"` ?")) {
    //   console.log("cancelled the action");
    //   return;
    // }
   
  }

  const returnProduct = async (id,item) =>{
    if (!window.confirm("Are you sure to Return the `"+item+" ` item you received ?")) {
      console.log("cancelled the action");
      return;
    }
    else { 
    try{
      await axios.put(`https://localhost:7258/api/Order/${id}`)
      .then(res => {
        console.log("result of returning product",res)
      })
    }
    catch(err){
      console.log("error while returning product",err);
    }
  }
  }

  const backToHome = () => {
    navigate("/home");
  };
  return (
    <>
      <section
        className="h-100 h-custom bg-light"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container py-5 h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <h2 className="mb-3">
                      <a href="#!" className="text-body">
                        <span className="fas fa-long-arrow-alt-left me-2"></span>
                        My Orders
                      </a>
                    </h2>
                    <hr></hr>
                    <div class="table-responsive">
                      <table class="table table-light table-striped table-hover ">
                        <thead>
                          <tr>
                            <th scope="col ">
                              <p className="fs-5">Item</p>
                            </th>
                            <th scope="col">
                              <p className="fs-5">Name and Category</p>
                            </th>
                            <th scope="col">
                              <p className="fs-5">Quantity</p>
                            </th>
                            <th scope="col">
                              <p className="fs-5">Price per piece</p>
                            </th>
                            <th scope="col">
                              <p className="fs-5">Status</p>
                            </th>
                            <th scope="col">
                              <p className="fs-5">Action</p>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {myOrders &&
                            myOrders.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    <div className="">
                                      <a
                                        href={`/product/${item.product.id}`}
                                        className="text-decoration-none"
                                      >
                                        <img
                                          src={item.product.imageUrl}
                                          className="img-fluid rounded-3"
                                          alt={item.product.name}
                                          style={{ width: "65px" }}
                                        />
                                      </a>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="ms-2">
                                      <p>
                                        <b>{item.product.name}</b>
                                      </p>
                                      <p className="small mb-0">
                                        {item.product.category.name}
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div
                                      className="form-outline"
                                      style={{ width: "3rem" }}
                                    >
                                      <p className="medium mb-0">
                                        {item.quantity}
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div style={{ width: "80px" }}>
                                      <p className="mb-0">
                                        ${item.product.price}
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div style={{ width: "80px" }}>
                                      <p className="medium mb-0">
                                      {item.status === 1 ? <>On the Way</> : <></>}
                                      {item.status === 2 ? <>Delivered</> : <></>}
                                      {item.status === 3 ? <p className="text-danger">Cancelled</p> : <></>}
                                      {item.status === 4 ? <p className="text-danger">Returned</p> : <></>}
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    {item.status === 1 ? <><button type="button" className="btn btn-outline-warning btn-sm" onClick={() =>{cancelOrder(item.id,item.product.name)}}>Cancel</button></> : <></>}
                                    {item.status === 2 ? <><button type="button" className="btn btn-outline-danger btn-sm" onClick={() => {returnProduct(item.id,item.product.name)}}>Return</button></> : <></>}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg"
                    onClick={backToHome}
                  >
                    Back to home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyOrders;
