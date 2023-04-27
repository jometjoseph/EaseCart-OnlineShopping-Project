import { Link } from "react-router-dom";
import './PageNotFound.css';
import { isAdministrator } from "../utils/tokenHelper";

function PageNotFound(){
    const isAdmin = isAdministrator();
    return(
        <div className="container d-flex justify-content-center align-items-center flex-column" style={{height: "100vh"}}>
        <div className="pagenotfoundbody">
        <div class="typing">
        <h2 class="text-uppercase">⚠️404Error</h2>
       </div>
        </div>
        <h2 className='text-center'><i>Page Not Found</i></h2>
                 <div className="fs-5 text-center">Go back to Homepage</div>
                 <div className=" text-center p-2 ">
                {isAdmin && <>
                    <Link to={"/admin"} className="btn btn-primary btn-lg">Back to Home page</Link>
                </>}
                {!isAdmin && <>
                    <Link to={"/home"} className="btn btn-primary btn-lg">Back to Home page</Link>
                </>}
         </div>
    </div>
    )
}

export default PageNotFound;