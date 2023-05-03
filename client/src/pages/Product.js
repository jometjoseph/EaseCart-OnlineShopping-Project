import { useEffect, useState } from "react";
import "./Product.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Cart4, Link } from "react-bootstrap-icons";
import StarRating from 'react-bootstrap-star-rating';

function Product() {
  const navigate = useNavigate();
  const [product, setProduct] = useState("");
  const { id } = useParams();
  const [user,setUser] = useState("");
  
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
          profileDetails();
        });
    } catch (err) {
      console.log("error is", err);
    }
  }, []);

  const profileDetails = () => {
    axios
      .get("https://localhost:7258/profile")
      .then((res) => {
        console.log("profile ", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const AddToCart = async (prodId,uId) => {
    try {
      await axios
        .post("https://localhost:7258/api/Cart", {
          productId: prodId,
          applicationUserId: uId
        })
        .then((res) => {
          console.log("result from add to cart", res);
          toast.success("Product added to your cart", {
            position: toast.POSITION.TOP_CENTER,
          });
          navigate("/cart");
        });
    } catch (error) {
      console.log("eror from add to cart", error);
    }
  };

  
  const backToHome = () => {
    navigate("/home");
  };
  return (
    <>
      <section className="py-5 mt-4 pt-5">
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
                  
                    <span className="ms-1">{product.rating}</span>
                  </div>
                  <span className="text-muted">
                    <i className="fas fa-shopping-basket fa-sm mx-1"></i>
                    {product.quantity <= 5 && product.quantity >=1 ?  <span className="fw-bold text-danger">only a few stocks left</span> : <></>}
                            {product.quantity < 1 ?  <span className="fw-bold text-danger">Out of stocks</span> : <></>}
                            {product.quantity > 5 ?  <span className="fw-bold ">{product.quantity}</span> : <></>}
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

                  <div className="col-md-4 col-6 mb-3">
                    
                  </div>
                </div>
                {/* <a href="#" className="btn btn-warning shadow-0"> Buy now </a> */}
                
                <button href="#c" className="btn btn-primary shadow-0" onClick={() => {AddToCart(product.id,user.id)}}>
                  {" "}
                  <Cart4/> Add to cart{" "}
                </button>
                <button
                  type="button"
                  onClick={backToHome}
                  className="btn btn-secondary border border-secondary py-2 icon-hover px-3"
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
