import electronics1 from "../images/electronics1.png";
import mensclothing1 from "../images/mensclothing1.png";
import womensclothing1 from "../images/womensclothing1.png";
import jewellery1 from "../images/jewellery1.png";
import toys from "../images/toys.png";
import footwear from "../images/footwear.png";

function SecondNavbar(){
    return(
        <>
        <div className="p-4 order-sm-3 flex-column bg-light d-flex align-items-center" style={{height: "17vh"}}>
        <a href="/allProducts" className="text-decoration-none">    
            <img
                                src={electronics1}
                                className="img-fluid"
                                style={{height: "10vh",width: "100px"}}
                                alt="Electronics"
            />
            </a>
            <div>Electronics</div>
            </div> 
            <div className="p-4 order-sm-3 flex-column bg-light d-flex align-items-center" style={{height: "17vh"}}>
            <img
                                src={mensclothing1}
                                className="img-fluid"
                                style={{height: "10vh",width: "100px"}}
                                alt="Electronics"
            />
            <div>Men's Clothing</div>
            </div>
            <div className="p-4 order-sm-3 flex-column bg-light d-flex align-items-center" style={{height: "17vh"}}>
            <img
                                src={womensclothing1}
                                className="img-fluid"
                                style={{height: "10vh",width: "100px"}}
                                alt="Electronics"
            />
            <div>Women's Clothing</div>
            </div>
            <div className="p-4 order-sm-3 flex-column bg-light d-flex align-items-center" style={{height: "17vh"}}>
            <img
                                src={jewellery1}
                                className="img-fluid"
                                style={{height: "10vh",width: "100px"}}
                                alt="Electronics"
            />
            <div>Jewellery</div>
            </div>
            <div className="p-4 order-sm-3 flex-column bg-light d-flex align-items-center" style={{height: "17vh"}}>
            <img
                                src={footwear}
                                className="img-fluid"
                                style={{height: "10vh",width: "100px"}}
                                alt="Electronics"
            />
            <div>Footwear</div>
            </div>
            <div className="p-4 order-sm-3 flex-column bg-light d-flex align-items-center" style={{height: "17vh"}}>
            <img
                                src={toys}
                                className="img-fluid"
                                style={{height: "10vh",width: "100px"}}
                                alt="Electronics"
            />
            <div>Toys</div>
            </div>
            
        </>
    );
}

export default SecondNavbar;