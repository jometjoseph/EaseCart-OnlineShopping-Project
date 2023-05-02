import { useEffect, useState } from "react";
import SecondNavbar from "../components/SecondNavbar";
import axios from "axios";
import MainNav from "../components/MainNav";
import { useParams } from "react-router-dom";

function AllProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const { id } = useParams();
  const [filteredResults, setFilteredResults] = useState([]);
  useEffect(() => {
    try {
      axios.get("https://localhost:7258/api/Product").then((res) => {
        console.log("product fetching success", res.data);
        setAllProducts(res.data);
      });
    } catch (err) {
      console.log("product fetching failed", err);
    }
    categorySelector(id)
  }, []);

  const categorySelector = async (id) => {
    try{
      await axios.get(`https://localhost:7258/api/Product/ProductByCategoryId/${id}`)
      .then(res => {
        console.log("products by category",res);
        if(res.data !== []){
          setFilteredResults(res.data);
        }
      })
    }
    catch(err){

    }
  }
  return (
    <>
    <MainNav/>
      <div className="mt-5">
        <div className="d-flex flex-row flex-wrap justify-content-around bg-light">
          <SecondNavbar backToHome={true}/>
        </div>
        <div className="container-fluid " style={{ backgroundColor: "#ecf2fafe" }}>
          <section >
            <div className="container py-5">
              <div className="row ">
              {!filteredResults && <>
                {allProducts &&
                  allProducts.map((item, index) => {
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
              </>}  
              {filteredResults &&
                  filteredResults.map((item, index) => {
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
                
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
export default AllProductsPage;
