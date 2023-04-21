import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function MyOrders() {
    const [myOrders, setMyOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            axios.get('https://localhost:7258/api/Order/User/Orders')
                .then(res => {
                    console.log("Orders made by user", res.data.result);
                    setMyOrders(res.data.result);
                })
        }
        catch (err) {
            console.log("Error while fetching", err);
        }
    }, []);

    const backToHome = () => {
        navigate("/home");
    }
    return (
        <><section className="h-100 h-custom bg-light" style={{ backgroundColor: "#eee" }}>
            <div className="container py-5 h-100 ">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card">
                            <div className="card-body p-4">
                                <div className="row">
                                    <h2 className="mb-3"><a href="#!" className="text-body"><span
                                        className="fas fa-long-arrow-alt-left me-2"></span>My Orders</a></h2>
                                    <hr></hr>
                                    <div class="table-responsive">
                                        <table class="table table-light table-striped table-hover ">
                                            <thead>
                                                <tr>
                                                    <th scope="col "><p className="fs-5">Item</p></th>
                                                    <th scope="col"><p className="fs-5">Name and Category</p></th>
                                                    <th scope="col"><p className="fs-5">Quantity</p></th>
                                                    <th scope="col"><p className="fs-5">Price per piece</p></th>
                                                    <th scope="col"><p className="fs-5">Status</p></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {myOrders && myOrders.map((item, index) => {
                                                    return (

                                                        <tr key={index}>

                                                            <td>
                                                                <div className="">
                                                                    <a href={`/product/${item.product.id}`} className="text-decoration-none">
                                                                        <img
                                                                            src={item.product.imageUrl} className="img-fluid rounded-3" alt={item.product.name} style={{ width: "65px" }} />
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="ms-2">
                                                                    <p><b>{item.product.name}</b></p>
                                                                    <p className="small mb-0">{item.product.category.name}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="form-outline" style={{ width: "3rem" }}>
                                                                    <p className="medium mb-0">{item.quantity}</p>

                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div style={{ width: "80px" }}>
                                                                    <p className="mb-0">${item.product.price}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div style={{ width: "80px" }}>
                                                                    <p className="medium mb-0">{item.status}</p>
                                                                </div>
                                                            </td>

                                                        </tr>
                                                    )
                                                })
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                                <button type='button' className='btn btn-secondary btn-lg' onClick={backToHome}>
                                    Back to home
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default MyOrders;