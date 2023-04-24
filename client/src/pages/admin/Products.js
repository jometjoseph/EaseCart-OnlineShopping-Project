import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCreate from "../../components/admin/ProductCreate";

function Products() {
  const [products, setProducts] = useState([]);
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
  }, []);
  const backToHome = () => {
    navigate("/admin");
  };
  return (
    <>
      <div className="col py-3 mt-4">
        <div className="d-flex justify-content-between">
          <div>
            <h2>Products</h2>
          </div>
          <div className="">
            <ProductCreate />
          </div>
        </div>
        <div className="card">
          <div
            className="table-responsive card-body p-4"
            style={{ height: "70vh" }}
          >
            {products && (
              <>
                <table className="table table-light table-striped table-hover table-responsive-md table-bordered">
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
export default Products;
