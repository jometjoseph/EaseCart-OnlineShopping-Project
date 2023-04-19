// import { Carousel } from "bootstrap";
import MainNav from "../components/MainNav";
import CarouselComponent from "../components/CarouselComponent";
import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBRipple } from "mdb-react-ui-kit";
import axios from "axios";
import { Link } from "react-router-dom";
import { setSecNavbar } from "../utils/tokenHelper";
import { Navbar } from "react-bootstrap";

function Homepage() {
    const [products, setProducts] = useState([]);
    const [profile, SetProfile] = useState("");
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    setSecNavbar(true);
    useEffect(() => {
        try {
            axios.get('https://localhost:7258/api/Product')
                .then(res => {
                    console.log("product fetching success", res.data);
                    setProducts(res.data);
                })
        }
        catch (err) {
            console.log("product fetching failed", err);
        }
        profileDetails();
    }, []);
    const profileDetails = () => {
        axios.get('https://localhost:7258/profile')
            .then(res => {
                console.log("profile ", res.data);
                SetProfile(res.data);
            })
            .catch(err => {
                console.log("error", err);
            })
    }
    const AddToCart = async (prodId, userId) => {
        try {
            await axios.post("https://localhost:7258/api/Cart", {
                productId: prodId,
                applicationUserId: userId
            }).then(res => {
                console.log("result from add to cart", res);
            })
        }
        catch (error) {
            console.log("eror from add to cart", error);
        }

    }

    const searchOutput = (searchKey) => {
        console.log("searchkey is ", searchKey)
        setSearchInput(searchKey);
        if (searchInput !== '') {
            const filteredData = products.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData);
            console.log("filtered items are ", filteredData);
        }
        else {
            console.log("in else case ")
            setFilteredResults(products);
        }
    }
    return (
        <>
            <MainNav />
            <div className="mt-5</div>">
                <CarouselComponent />
                <div className="container-fluid">
                    <MDBContainer fluid className="my-5 text-center">
                        <hr></hr>
                        <h4 className="mt-4 mb-5">
                            <strong>Top Picks for you</strong>
                        </h4>

                        <MDBRow>
                            {products && products.map((item, index) => {
                                return (
                                    <MDBCol md="8" lg="2" key={index} className="mb-4">
                                        <MDBRipple
                                            rippleColor="dark"
                                            rippleTag="div"
                                            className="bg-image rounded hover-zoom shadow-1-strong"
                                        >
                                            <Link to={`/product/${item.id}`} className="text-decoration-none">
                                                <div className="ratio ratio-4x3">
                                                    <img
                                                        src={item.imageUrl}

                                                        className="w-100"
                                                        alt=""
                                                    />
                                                </div>
                                            </Link>
                                            <div
                                                className="mask"
                                                style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                                            >
                                                <div className="d-flex justify-content-start align-items-center h-100">
                                                    <h5>
                                                        <span className="badge bg-light pt-2 ms-3 mt-3 text-dark">
                                                            ${item.price}
                                                        </span>
                                                    </h5>
                                                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => { AddToCart(item.id, profile.id) }}>
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="hover-overlay">
                                                <div
                                                    className="mask"
                                                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                ></div>
                                            </div>
                                        </MDBRipple>
                                    </MDBCol>
                                )
                            })
                            }

                        </MDBRow>
                        <hr></hr>
                    </MDBContainer>
                </div>
            </div>
        </>
    )
}

export default Homepage;