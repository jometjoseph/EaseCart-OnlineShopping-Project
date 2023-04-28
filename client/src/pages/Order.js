import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Order() {
    const navigate = useNavigate();
    const [quantityValues, setQuantityValues] = useState([]);
    const { quantity } = useParams();
    const [cartProducts, setCartProducts] = useState([]);
    const [buyNow, setBuyNow] = useState([]);
    const orderProductLength = buyNow.length;
    const item = [];
    useEffect(() => {
        for (let i = 0; i < quantity.length; i++) {
            if (quantity[i] !== ',') {
                item.push(quantity[i]);
                // console.log("array vals",quantity[i]);
            }
        }
        setQuantityValues(item);
        console.log("new q array", quantityValues);
        getOrderingItems();

    }, []);

    const getOrderingItems = () => {
        try {
            axios.get('https://localhost:7258/api/Cart/UserCart')
                .then((res) => {
                    console.log("ordering result  ", res);
                    if (res.data === []) {
                        toast.warning('Something went wrong', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                    setCartProducts(res.data);
                    const filteredItems = res.data;
                    console.log("cartproducts bhdihicv", filteredItems);
                    const BuyNow = filteredItems.filter((product) => product.status === 1);
                    setBuyNow(BuyNow);
                    console.log("buy now ", BuyNow);
                }
                )
        }
        catch (err) {
            console.log("error while ordering");
            toast.error('Something went wrong', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    const orderItems = () => {
        console.log("ordering....................")
        if (!window.confirm('Confirm buying ')) {
            toast.error('Something went wrong', {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log("cancelled order");
            return;
        }
        else {
            try {
                buyNow.forEach((item, index) => {
                    const totalPrice = item.product.price * quantityValues[index];
                    console.log("quantity", quantityValues[index]);
                    console.log("prod price", item.product.price);
                    console.log("total price", totalPrice);
                    console.log("product id", item.product.id);
                    const data = {
                        quantity: quantityValues[index],
                        total: totalPrice,
                        productId: item.product.id,
                        applicationUserId: "string"
                    }
                    try {
                        axios.post('https://localhost:7258/api/Order/userOrders', data)
                            .then(res => {
                                console.log("Item ordered successfully", res)
                                try {
                                    axios.delete(`https://localhost:7258/api/Cart/${item.id}`)
                                        .then((res) => {
                                            console.log("deleted item successfully", res);
                                        })
                                        .catch((err) => {
                                            console.log("deletion failed", err);
                                        })
                                }
                                catch (err) {

                                }
                            })
                    }
                    catch (err) {
                        console.log("error while ordering", err);
                    }
                })
                navigate('/cart');
            }
            catch (err) {
                console.log("error while fetching products", err);
            }
        }

    }

    const backToCart = () => {
        navigate('/cart');
    }
    console.log("quantities", typeof (quantity));
    console.log(quantity);
    return (
        <>
            <section className="h-100 h-custom bg-light" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5 h-100 ">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">
                                        {/* <div className="col-lg-7"> */}
                                        {buyNow && buyNow.map((item, index) => {
                                            return (
                                                <div className=" card mb-3" key={index}>
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="d-flex flex-row align-items-center">
                                                                <div>
                                                                    <img
                                                                        src={item.product.imageUrl}
                                                                        className="img-fluid rounded-3" alt={item.product.name} style={{ width: "65px" }} />
                                                                </div>
                                                                <div className="ms-3">
                                                                    <h5>{item.product.name}</h5>type of status {typeof (item.status)}
                                                                    <p className="small mb-0">{item.product.category.name}</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-row align-items-center">
                                                                <div className='' style={{ width: "50px" }}>
                                                                    <div className="form-outline" style={{ width: "3rem" }}>
                                                                        <input min="1" max="20" type="number" id="typeNumber" defaultValue={quantityValues[index]} className="form-control" onChange={(e) => { }} />

                                                                    </div>
                                                                </div>
                                                                <div style={{ width: "80px" }}>
                                                                    <h5 className="mb-0">${item.product.price}</h5>
                                                                </div>
                                                                <form>
                                                                    {/* <button type='button' className='btn btn-outline-dark' onClick={() => { }}>Buy Later</button> */}
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        }
                                        <div className="card-body">
                                            <button type="button" className="btn btn-warning btn-block btn-lg" onClick={() => { orderItems() }}>
                                                <div className="d-flex justify-content-between">
                                                    {/* <span>${Math.round(props.sum + 20)}.00</span> */}
                                                    <span>Continue ordering <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                                                </div>
                                            </button>
                                            <button type='button' className='btn btn-secondary btn-lg' onClick={backToCart}>
                                                Back

                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </section>
        </>
    )
}

export default Order;