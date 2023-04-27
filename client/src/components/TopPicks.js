import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
import axios from "axios";

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
    <Carousel fade>
      <Carousel.Item>
        <div className="">
          <section style={{ backgroundColor: "#eee" }}>
            <div class="text-center container py-5">
              <h4 class="mt-4 mb-5">
                <strong>Top Picks</strong>
              </h4>

              <div class="row">
                <div class="col-lg-4 col-md-12 mb-4">
                  <div class="card">
                    <div
                      class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                      data-mdb-ripple-color="light"
                    >
                        <div className="ratio ratio-4x3">
                      <img
                        src={topProducts[0].imageUrl}
                        class="w-100"
                        alt="hsh"
                      />
                      </div>
                      <a href="#!">
                        <div class="mask">
                          <div class="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <span class="badge bg-primary ms-2">New</span>
                            </h5>
                          </div>
                        </div>
                        <div class="hover-overlay">
                          <div
                            class="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </div>
                      </a>
                    </div>
                    <div class="card-body">
                      <a href="s" class="text-reset">
                        <h5 class="card-title mb-3">{topProducts[0].name}</h5>
                      </a>
                      <h6 class="mb-3">${topProducts[0].price}</h6>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4">
                  <div class="card">
                    <div
                      class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                      data-mdb-ripple-color="light"
                    >
                        <div className="ratio ratio-4x3">
                      <img
                        src={topProducts[1].imageUrl}
                        class="w-100"
                        alt="hsh"
                      />
                      </div>
                      <a href="#!">
                        <div class="mask">
                          <div class="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <span class="badge bg-primary ms-2">New</span>
                            </h5>
                          </div>
                        </div>
                        <div class="hover-overlay">
                          <div
                            class="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </div>
                      </a>
                    </div>
                    <div class="card-body">
                      <a href="s" class="text-reset">
                        <h5 class="card-title mb-3">{topProducts[1].name}</h5>
                      </a>
                      <h6 class="mb-3">${topProducts[1].price}</h6>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 col-md-6 mb-4">
                  <div class="card">
                    <div
                      class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                      data-mdb-ripple-color="light"
                    >
                        <div className="ratio ratio-4x3">
                      <img
                        src={topProducts[2].imageUrl}
                        class="w-100"
                        alt="hsh"
                      />
                      </div>
                      <a href="#!">
                        <div class="mask">
                          <div class="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <span class="badge bg-primary ms-2">New</span>
                            </h5>
                          </div>
                        </div>
                        <div class="hover-overlay">
                          <div
                            class="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </div>
                      </a>
                    </div>
                    <div class="card-body">
                      <a href="s" class="text-reset">
                        <h5 class="card-title mb-3">{topProducts[2].name}</h5>
                      </a>
                      <h6 class="mb-3">${topProducts[2].price}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className="">
          <section style={{ backgroundColor: "#eee" }}>
            <div class="text-center container py-5">
              <h4 class="mt-4 mb-5">
                <strong>Top Picks</strong>
              </h4>

              <div class="row">
                <div class="col-lg-4 col-md-12 mb-4">
                  <div class="card">
                    <div
                      class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                      data-mdb-ripple-color="light"
                    >
                        <div className="ratio ratio-4x3">
                      <img
                        src={topProducts[3].imageUrl}
                        class="w-100"
                        alt="hsh"
                      />
                      </div>
                      <a href="#!">
                        <div class="mask">
                          <div class="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <span class="badge bg-primary ms-2">New</span>
                            </h5>
                          </div>
                        </div>
                        <div class="hover-overlay">
                          <div
                            class="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </div>
                      </a>
                    </div>
                    <div class="card-body">
                      <a href="s" class="text-reset">
                        <h5 class="card-title mb-3">{topProducts[3].name}</h5>
                      </a>
                      
                      <h6 class="mb-3">${topProducts[3].price}</h6>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4">
                  <div class="card">
                    <div
                      class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                      data-mdb-ripple-color="light"
                    >
                        <div className="ratio ratio-4x3">
                      <img
                        src={topProducts[4].imageUrl}
                        class="w-100"
                        alt="hsh"
                      />
                      </div>
                      <a href="#!">
                        <div class="mask">
                          <div class="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <span class="badge bg-primary ms-2">New</span>
                            </h5>
                          </div>
                        </div>
                        <div class="hover-overlay">
                          <div
                            class="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </div>
                      </a>
                    </div>
                    <div class="card-body">
                      <a href="s" class="text-reset">
                        <h5 class="card-title mb-3">{topProducts[4].name}</h5>
                      </a>
                      
                      <h6 class="mb-3">${topProducts[4].price}</h6>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 col-md-6 mb-4">
                  <div class="card">
                    <div
                      class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                      data-mdb-ripple-color="light"
                    >
                        <div className="ratio ratio-4x3">
                      <img
                        src={topProducts[5].imageUrl}
                        class="w-100"
                        alt="hsh"
                      />
                      </div>
                      <a href="#!">
                        <div class="mask">
                          <div class="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <span class="badge bg-primary ms-2">New</span>
                            </h5>
                          </div>
                        </div>
                        <div class="hover-overlay">
                          <div
                            class="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </div>
                      </a>
                    </div>
                    <div class="card-body">
                      <a href="s" class="text-reset">
                        <h5 class="card-title mb-3">{topProducts[5].name}</h5>
                      </a>
                     
                      <h6 class="mb-3">${topProducts[5].price}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className="">
          <section style={{ backgroundColor: "#eee" }}>
            <div class="text-center container py-5">
              <h4 class="mt-4 mb-5">
                <strong>Top Picks</strong>
              </h4>

              <div class="row">
                <div class="col-lg-4 col-md-12 mb-4">
                  <div class="card">
                    <div
                      class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                      data-mdb-ripple-color="light"
                    >
                        <div className="ratio ratio-4x3">
                      <img
                        src={topProducts[6].imageUrl}
                        class="w-100"
                        alt="hsh"
                      />
                      </div>
                      <a href="#!">
                        <div class="mask">
                          <div class="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <span class="badge bg-primary ms-2">New</span>
                            </h5>
                          </div>
                        </div>
                        <div class="hover-overlay">
                          <div
                            class="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </div>
                      </a>
                    </div>
                    <div class="card-body">
                      <a href="s" class="text-reset">
                        <h5 class="card-title mb-3">{topProducts[6].name}</h5>
                      </a>
                      
                      <h6 class="mb-3">${topProducts[6].price}</h6>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4">
                  <div class="card">
                    <div
                      class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                      data-mdb-ripple-color="light"
                    >
                        <div className="ratio ratio-4x3">
                      <img
                        src={topProducts[7].imageUrl}
                        class="w-100"
                        alt="hsh"
                      />
                      </div>
                      <a href="#!">
                        <div class="mask">
                          <div class="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <span class="badge bg-primary ms-2">New</span>
                            </h5>
                          </div>
                        </div>
                        <div class="hover-overlay">
                          <div
                            class="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </div>
                      </a>
                    </div>
                    <div class="card-body">
                      <a href="s" class="text-reset">
                        <h5 class="card-title mb-3">{topProducts[7].name}</h5>
                      </a>
                     
                      <h6 class="mb-3">${topProducts[7].price}</h6>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 col-md-6 mb-4">
                  <div class="card">
                    <div
                      class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                      data-mdb-ripple-color="light"
                    >
                    <div className="ratio ratio-4x3">
                      <img
                        src={topProducts[8].imageUrl}
                        class="w-100"
                        alt="hsh"
                      />
                      </div>
                      <a href="#!">
                        <div class="mask">
                          <div class="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <span class="badge bg-primary ms-2">New</span>
                            </h5>
                          </div>
                        </div>
                        <div class="hover-overlay">
                          <div
                            class="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </div>
                      </a>
                    </div>
                    <div class="card-body">
                      <a href="s" class="text-reset">
                        <h5 class="card-title mb-3">{topProducts[8].name}</h5>
                      </a>
                      
                      <h6 class="mb-3">${topProducts[8].price}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default TopPicks;
