import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Order() {
    const navigate = useNavigate();
    const [quantityValues,setQuantityValues] = useState([]);
    const { quantity } = useParams();
    const item = [];
    useEffect(() => {
        for(let i = 0; i < quantity.length; i++){
            if(quantity[i] !== ','){
                item.push(quantity[i]);
                // console.log("array vals",quantity[i]);
            }  
        }
        setQuantityValues(item);
        console.log("new q array",quantityValues);
    },[]);
    const backToCart = () => {
        navigate('/cart');
    }
    console.log("quantities",typeof(quantity));
    console.log(quantity);
    return (
        <section className="h-100 h-custom bg-light" style={{ backgroundColor: "#eee" }}>
            <div className="container py-5 h-100 ">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card">
                            <div className="card-body p-4">
                                <div className="row">
                                    <button type='button' className='btn btn-secondary btn-lg' onClick={backToCart}>
                                        Back to home
                                        
                                    </button>
                                    {quantityValues && quantityValues.map((item) => {
                                            return(
                                                <h2>
                                                    {item}<br></br>
                                                </h2>
                                            )
                                        })
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Order;