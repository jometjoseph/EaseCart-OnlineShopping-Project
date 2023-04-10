import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { removeToken, setSecNavbar } from "../utils/tokenHelper";

function Logout(){
    const navigate = useNavigate();
    useEffect(() =>{
        removeToken();
        setSecNavbar(false);
        navigate('/');
    })
    return(
        <div>

        </div>
    )
}

export default Logout;