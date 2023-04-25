import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      axios.get("https://localhost:7258/api/Product").then((res) => {
        console.log("result fro prod fetch", res.data);
        setProducts(res.data);
      });
    } catch (err) {
      console.log("product fetching failed", err);
    }
    getOrders();
  }, []);

  const getOrders = () => {
    try {
      axios.get("https://localhost:7258/api/Order").then((res) => {
        console.log("product orders", res.data.result);
        setOrders(res.data.result);
      });
    } catch (err) {
      console.log("order fetching failed", err);
    }
  };

  const productPage = () => {
    navigate("/admin/products");
  };

  const orderPage = () => {
    navigate("/admin/orders");
  };

  return (
    <>
      <div className="col py-3 mt-4">
        <h1>Admin Dashboard</h1>
        <div className="card">
          <div className="card-body p-2 text-center">
            <h2>Products</h2>
          </div>
          <div
            className="table-responsive card-body p-4"
            style={{ height: "300px" }}
          >
            {products && (
              <>
                <table className="table table-white table-striped table-hover table-responsive-md table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Sl No</th>
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Desciption</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            <img
                              src={item.imageUrl}
                              className="img-fluid rounded-3"
                              alt={item.name}
                              style={{ width: "65px" }}
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.category.name}</td>
                          <td>
                            <span
                              className="d-inline-block text-truncate"
                              style={{ maxWidth: "150px" }}
                            >
                              {item.description}
                            </span>{" "}
                          </td>
                          <td>{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>{item.rating}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
          <div className="card-body shadow p-2">
            <button
              type="button"
              className="btn btn-success btn-md"
              onClick={productPage}
            >
              +Add New Product
            </button>
          </div>
        </div>
        <br />

        <div className="card">
          <div className="card-body p-2 text-center">
            <h2>Orders</h2>
          </div>
          <div
            className="table-responsive card-body p-4"
            style={{ height: "300px" }}
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
              className="btn btn-primary btn-md"
              onClick={orderPage}
            >
              View All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
