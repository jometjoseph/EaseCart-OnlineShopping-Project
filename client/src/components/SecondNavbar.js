import electronics1 from "../images/electronics1.png";
import mensclothing1 from "../images/mensclothing1.png";
import womensclothing1 from "../images/womensclothing1.png";
import jewellery1 from "../images/jewellery1.png";
import toys from "../images/toys.png";
import footwear from "../images/footwear.png";
import backtohome from "../images/backtohome.png";

function SecondNavbar(props){
    return(
        <>
        {props.backToHome && 
        <div className="p-4 order-sm-3 flex-column bg-light d-flex align-items-center" style={{height: "17vh"}}>
        <a href={`/home`} className="text-decoration-none">    
            <img
                                src={backtohome}
                                className="img-fluid"
                                style={{height: "70px",width: "70px"}}
                                alt="Electronics"
            />
            </a>
            <div>Back to Home</div>
            </div>
        }
        <div className="p-4 order-sm-3 flex-column bg-light d-flex align-items-center" style={{height: "17vh"}}>
        <a href={`/allProducts/${2}`} className="text-decoration-none">    
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
            <a href={`/allProducts/${3}`} className="text-decoration-none">
            <img
                                src={mensclothing1}
                                className="img-fluid"
                                style={{height: "10vh",width: "100px"}}
                                alt="Men's Clothing"
            />
            </a>
            <div>Men's Clothing</div>
            </div>
            <div className="p-4 order-sm-3 flex-column bg-light d-flex align-items-center" style={{height: "17vh"}}>
            <a href={`/allProducts/${4}`} className="text-decoration-none">
            <img
                                src={womensclothing1}
                                className="img-fluid"
                                style={{height: "10vh",width: "100px"}}
                                alt="Women's Clothing"
            />
            </a>
            <div>Women's Clothing</div>
            </div>
            <div className="p-4 order-sm-3 flex-column bg-light d-flex align-items-center" style={{height: "17vh"}}>
            <a href={`/allProducts/${5}`} className="text-decoration-none">
            <img
                                src={jewellery1}
                                className="img-fluid"
                                style={{height: "10vh",width: "100px"}}
                                alt="Jewellery"
            />
            </a>
            <div>Jewellery</div>
            </div>
            <div className="p-4 order-sm-3 flex-column bg-light d-flex align-items-center" style={{height: "17vh"}}>
            <a href={`/allProducts/${6}`} className="text-decoration-none">
            <img
                                src={footwear}
                                className="img-fluid"
                                style={{height: "10vh",width: "100px"}}
                                alt="Footwear"
            />
            </a>
            <div>Footwear</div>
            </div>
            <div className="p-4 order-sm-3 flex-column bg-light d-flex align-items-center" style={{height: "17vh"}}>
            <a href={`/allProducts/${7}`} className="text-decoration-none">
            <img
                                src={toys}
                                className="img-fluid"
                                style={{height: "10vh",width: "100px"}}
                                alt="Footwear"
            />
            </a>
            <div>Toys</div>
            </div>
            
        </>
    );
}

export default SecondNavbar;