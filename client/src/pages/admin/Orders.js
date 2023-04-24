import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      axios.get("https://localhost:7258/api/Order").then((res) => {
        console.log("product orders", res.data.result);
        setOrders(res.data.result);
      });
    } catch (err) {
      console.log("order fetching failed", err);
    }
  }, []);
  const backToHome = () => {
    navigate("/admin");
  };
  return (
    <>
      <div className="col py-3 mt-4">
        <div className="d-flex justify-content-between">
          <div>
            <h2>Orders</h2>
          </div>
          <div className="">
            <button type="button" className="btn btn-success btn-md">
              Edit
            </button>
          </div>
        </div>
        <div className="card">
          <div
            className="table-responsive card-body p-4"
            style={{ height: "60vh" }}
          >
            {orders && (
              <>
                <table className="table table-white table-striped table-hover table-responsive-md table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Sl No</th>
                      <th scope="col">User</th>
                      <th scope="col">Product</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.applicationUser.name}</td>
                          <td>{item.product.name}</td>
                          <td>{item.quantity}</td>
                          <td>${item.total}</td>
                          <td>
                            {item.status === 1 ? "OntheWay" : ""}
                            {item.status === 2 ? "Delivered" : ""}
                            {item.status === 3 ? "Cancelled" : ""}
                            {item.status === 4 ? "Returned" : ""}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
          <div className="card-body shadow p-1">
            <button
              type="button"
              className="btn btn-secondary btn-md"
              onClick={backToHome}
            >
              Back to home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Orders;
