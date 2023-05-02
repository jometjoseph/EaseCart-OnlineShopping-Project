// import { Carousel } from "bootstrap";
import MainNav from "../components/MainNav";
import CarouselComponent from "../components/CarouselComponent";
import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBRipple } from "mdb-react-ui-kit";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setSecNavbar } from "../utils/tokenHelper";
import { toast } from "react-toastify";
import TopPicks from "../components/TopPicks";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

function Homepage() {
  const [products, setProducts] = useState([]);
  const [profile, SetProfile] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();
  const searchTerm = useSelector(state => state.easeCart.searchKey);
  console.log("search value in home page",searchTerm);

  setSecNavbar(true);
  useEffect(() => {
    try {
      axios.get("https://localhost:7258/api/Product").then((res) => {
        console.log("product fetching success", res.data);
        setProducts(res.data);
      });
    } catch (err) {
      console.log("product fetching failed", err);
    }
    profileDetails();
  }, []);
  const profileDetails = () => {
    axios
      .get("https://localhost:7258/profile")
      .then((res) => {
        console.log("profile ", res.data);
        SetProfile(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const handleSearch = (value) => {
    setSearchInput(value);
    searchOutput(value);
  }
  const AddToCart = async (prodId, userId) => {
    try {
      await axios
        .post("https://localhost:7258/api/Cart", {
          productId: prodId,
          applicationUserId: userId,
        })
        .then((res) => {
          console.log("result from add to cart", res);
          toast.success("Product added to your cart", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
        navigate("/cart");
    } catch (error) {
      console.log("eror from add to cart", error);
    }
  };

  const searchOutput = (searchKey) => {
    console.log("searchkey is ", searchKey);
    // setSearchInput(searchKey);
    if (searchInput !== "") {
      const filteredData = products.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
      console.log("filtered items are ", filteredData);
    } else {
      console.log("in else case ");
      setFilteredResults(products);
    }
  };
  // if(searchTerm !== ""){
  //   searchOutput(searchTerm);
  // }

  const tryAgain = () => {
    window.location.reload();
  };
  return (
    < >
      <MainNav onSearch={handleSearch}/>
      <div className="mt-5">
      <div className="d-flex flex-row flex-wrap justify-content-around bg-light" >
      <SecondNavbar />                                                                {/* SecondNavbar component  */}
      </div>
      <div className="">
        {searchInput.length < 1 ? <><CarouselComponent /> </> : <></>}                {/* Carousel component      */}                                                          
      </div>
      <div className="">
      {searchInput.length < 1 ? <><TopPicks/> </> : <></>}                            {/* TopPicks component      */}                                                                         
      </div>
        <div className="container-fluid">
          <MDBContainer fluid className="my-5 text-center">
            {searchInput.length < 1 ? (
              products.length >= 1 ? (
                <>
                  <hr></hr>
                  <h4 className="mt-4 mb-5">
                    <strong>Best Sellers : {searchInput}</strong>
                  </h4>
                  <MDBRow>
                    {products.map((item, index) => {
                      return (
                        <>
                        <div
                    className="col-md-3 col-lg-2 col-sm-4 mb-2 mb-lg-2"
                    key={index}
                  >
                    <div className="card">
                    <Link
                              to={`/product/${item.id}`}
                              className="text-decoration-none"
                            >
                      <div className="ratio ratio-4x3 mt-2">
                        <img
                          src={item.imageUrl}
                          className="card-img-top"
                          alt={item.name}
                        />
                      </div>
                      </Link>
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          {/* <p className="small">
                            <span className="text-muted">
                              {item.category.name}
                            </span>
                          </p> */}
                          <p className="small text-danger">
                            <s>${item.price}</s>
                          </p>
                          <h5 className="text-dark mb-0">${item.price}</h5>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                          <h5 className="mb-0 text-truncate">
                            {item.name}
                          </h5>
                          
                        </div>

                        {/* <div className="d-flex justify-content-between mb-2">
                          <p className="text-muted mb-0">
                            Available:{" "}
                            <span className="fw-bold">{item.quantity}</span>
                          </p>
                        </div> */}
                      </div>
                    </div>
                  </div>
                        
                        </>
                      );
                    })}
                  </MDBRow>
                </>
              ) : (
                <>
                  <MDBRow>
                    <h4 className="mt-4 mb-5">
                      <strong>Something went wrong </strong>
                    </h4>
                    <div className="card-body p-4">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={tryAgain}
                      >
                        Try again
                      </button>
                    </div>
                  </MDBRow>
                </>
              )
            ) : ( 
              <>
              <hr></hr>
                  <h4 className="mt-4 mb-5">
                    <strong>Search Results : {searchInput}</strong>
                  </h4>
                  <MDBRow>
              {filteredResults.map((item, index) => {
                return (
                  <div
                    className="col-md-3 col-lg-2 col-sm-4 mb-2 mb-lg-2"
                    key={index}
                  >
                    <div className="card">
                      <div className="ratio ratio-4x3 mt-2">
                        <img
                          src={item.imageUrl}
                          className="card-img-top"
                          alt={item.name}
                        />
                      </div>
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <p className="small">
                            <span className="text-muted">
                              {item.category.name}
                            </span>
                          </p>
                          <p className="small text-danger">
                            <s>${item.price}</s>
                          </p>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                          <h5 className="mb-0 text-truncate">
                            {item.name}
                          </h5>
                          <h5 className="text-dark mb-0">${item.price}</h5>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                          <p className="text-muted mb-0">
                            Available:{" "}
                            <span className="fw-bold">{item.quantity}</span>
                          </p>
                          <div className="ms-auto text-warning">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              </MDBRow>
              </>
            )
            
            }
            

            <hr></hr>
          </MDBContainer>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Homepage;
