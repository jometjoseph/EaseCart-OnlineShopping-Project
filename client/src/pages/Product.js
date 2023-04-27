import { useEffect, useState } from "react";
import "./Product.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Product() {
  const navigate = useNavigate();
  const [product, setProduct] = useState("");
  const { id } = useParams();
  
  useEffect(() => {
    console.log("productid is ", id);
    try {
      axios
        .get(`https://localhost:7258/api/Product/ProductById/${id}`)
        .then((res) => {
          console.log("result ", res.data.result);
          setProduct(res.data.result);
          console.log("product", product);
          console.log("product name", product.name);
        });
    } catch (err) {
      console.log("error is", err);
    }
  }, []);

  const backToHome = () => {
    navigate("/home");
  };
  return (
    <>
      <section className="py-5 mt-3">
        <div className="container">
          <div className="row gx-5">
            <aside className="col-lg-6">
              <div className="border rounded-4 mb-3 d-flex justify-content-center">
                <a
                  data-fslightbox="mygalley"
                  className="rounded-4"
                  target=""
                  data-type="image"
                  href={product.imageUrl}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "90vh",
                      margin: "auto",
                    }}
                    className="rounded-4 fit"
                    src={product.imageUrl}
                    alt={product.name}
                  />
                </a>
              </div>
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">
                  {product.name}
                  <br />
                </h4>
                <div className="d-flex flex-row my-3">
                  <div className="text-warning mb-1 me-2">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                    <span className="ms-1">{product.rating}</span>
                  </div>
                  <span className="text-muted">
                    <i className="fas fa-shopping-basket fa-sm mx-1"></i>
                    {product.quantity} orders
                  </span>
                  <span className="text-success ms-2">In stock</span>
                </div>

                <div className="mb-3">
                  <span className="h5">${product.price}</span>
                  <span className="text-muted">/per piece</span>
                </div>

                <p>{product.description}</p>

                <hr />
                <div className="row mb-4">
                  {/* <div className="col-md-4 col-6">
              <label className="mb-2">Size</label>
              <select className="form-select border border-secondary" style={{height: "35px"}}>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div> */}

                  <div className="col-md-4 col-6 mb-3">
                    
                  </div>
                </div>
                {/* <a href="#" className="btn btn-warning shadow-0"> Buy now </a> */}
                <a href="#c" className="btn btn-primary shadow-0">
                  {" "}
                  <i className="me-1 fa fa-shopping-basket"></i> Add to cart{" "}
                </a>
                <button
                  type="button"
                  onClick={backToHome}
                  className="btn btn-light border border-secondary py-2 icon-hover px-3"
                >
                  {" "}
                  Back to Home{" "}
                </button>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}

export default Product;
