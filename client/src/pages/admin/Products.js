import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCreate from "../../components/admin/ProductCreate";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import ProductEdit from "../../components/admin/ProductEdit";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    try {
      axios.get("https://localhost:7258/api/Product").then((res) => {
        console.log("result fro prod fetch", res.data);
        setProducts(res.data);
      });
    } catch (err) {
      console.log("product fetching failed", err);
    }
  };

  const deleteProduct = async (id) => {
    console.log("product to be del",id);
    if (!window.confirm('Are you sure to delete this Product?')) {
      console.log("deleting product");
      return;
    }
    else {
      await axios.delete(`https://localhost:7258/api/Product/${id}`)
        .then((res) => {
          console.log("deleted Product successfully", res);
          toast.success('Product removed from database', {
            position: toast.POSITION.TOP_CENTER
          });
          getProducts();
        })
        .catch((err) => {
          console.log("deletion failed", err);
        })
    }
  }
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
            <ProductCreate
              onAddProduct={(product) => setProducts([...products, product])}
            />
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
                      <th scope="col">Action</th>
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
                          <td>
                            <div
                              className="btn-group text-dark"
                              role="group"
                              aria-label="Basic example"
                            >
                              <ProductEdit prodId={item.id}/>
                              <button type="button" className="btn btn-outline-danger" onClick={() => {deleteProduct(item.id)}}>
                                <TrashFill/>
                              </button>
                            </div>
                          </td>
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
