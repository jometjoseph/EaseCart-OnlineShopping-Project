import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-bootstrap-icons";

function TopPicks() {
    const [topProducts,setTopProducts] = useState([]);
    useEffect(() => {
        try {
          axios.get("https://localhost:7258/api/Product").then((res) => {
            console.log("product fetching success", res.data);
            setTopProducts(res.data);
          });
        } catch (err) {
          console.log("product fetching failed", err);
        }
      }, []);
  return (
    <div className="bg-white">
    <Carousel fade className="bg-white">
      <Carousel.Item variant="primary">
        <div className="">
          <section style={{ backgroundColor: "#ebfafd" }}>
            <div className="text-center container py-5">
              <h4 className="mt-2 mb-3">
              <hr></hr>
                <strong>Top Picks for you</strong>
              </h4>
              <div className="row">
                {topProducts && topProducts.filter((item,index) => index>=0 && index < 4 ).map((item,index) => {
                  return(
                    <div className="col-lg-3 col-md-6 mb-4" key={index}>
                      
                  <div className="card">
                    <div
                      className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                      data-mdb-ripple-color="light"
                    >
                     <a
                            href={`/product/${item.id}`}
                            className="text-decoration-none"
                          >
                        <div className="ratio ratio-4x3 mt-2">
                        
                      <img
                        src={item.imageUrl}
                        className="w-100"
                        alt="hsh"
                      /> 
                      </div>
                      </a>
                      <a href="#!">
                        <div className="mask">
                          <div className="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <span className="badge bg-primary ms-2">New</span>
                            </h5>
                          </div>
                        </div>
                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </div>
                      </a>
                    </div>
                    <div className="card-body">
                    
                      <a href="s" className="text-reset text-decoration-none">
                        <p className="card-title mb-3 text-truncate">{item.name}</p>
                      </a>
                      <h6 className="mb-3">${item.price}</h6>
                    </div>
                  </div>
                </div>
                  )
                })}
                
              </div>
            </div>
          </section>
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className="">
          <section style={{ backgroundColor: "#ebfafd" }}>
            <div className="text-center container py-5">
              
              <h4 className="mt-2 mb-3">
              <hr></hr>
                <strong>Top Picks for you</strong>
                
              </h4>
              
              <div className="row">
                {topProducts && topProducts.filter((item,index) => index>=4 && index < 8 ).map((item,index) => {
                  return(
                    <div className="col-lg-3 col-md-6 mb-4" key={index}>
                  <div className="card">
                    <div
                      className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                      data-mdb-ripple-color="light"
                    >
                      <a
                            href={`/product/${item.id}`}
                            className="text-decoration-none"
                          >
                        <div className="ratio ratio-4x3 mt-2">
                      <img
                        src={item.imageUrl}
                        className="w-100"
                        alt="hsh"
                      />
                      </div>
                      </a>
                      <a href="#!">
                        <div className="mask">
                          <div className="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <span className="badge bg-success ms-2">Back to stock</span>
                            </h5>
                          </div>
                        </div>
                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </div>
                      </a>
                    </div>
                    <div className="card-body">
                      <a href="s" className="text-reset text-decoration-none">
                        <p className="card-title mb-3 text-truncate">{item.name}</p>
                      </a>
                      <h6 className="mb-3">${item.price}</h6>
                    </div>
                  </div>
                </div>
                  )
                })}
                
              </div>
            </div>
          </section>
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className="">
          <section style={{ backgroundColor: "#ebfafd" }}>
            <div className="text-center container py-5">
              <h4 className="mt-2 mb-3">
              <hr></hr>
                <strong>Top Picks for you</strong>
              </h4>
              <div className="row">
                {topProducts && topProducts.filter((item,index) => index>=8 && index < 12 ).map((item,index) => {
                  return(
                    <div className="col-lg-3 col-md-6 mb-4" key={index}>
                  <div className="card">
                    <div
                      className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                      data-mdb-ripple-color="light"
                    >
                      <a
                            href={`/product/${item.id}`}
                            className="text-decoration-none"
                          >
                        <div className="ratio ratio-4x3 mt-2">
                      <img
                        src={item.imageUrl}
                        className="w-100"
                        alt="hsh"
                      />
                      </div>
                      </a>
                      <a href="#!">
                        <div className="mask">
                          <div className="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <span className="badge bg-warning ms-2">discounts</span>
                            </h5>
                          </div>
                        </div>
                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </div>
                      </a>
                    </div>
                    <div className="card-body">
                      <a href="s" className="text-reset text-decoration-none">
                        <p className="card-title mb-3 text-truncate">{item.name}</p>
                      </a>
                      <h6 className="mb-3">${item.price}</h6>
                    </div>
                  </div>
                </div>
                  )
                })}
                
              </div>
            </div>
          </section>
        </div>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default TopPicks;
