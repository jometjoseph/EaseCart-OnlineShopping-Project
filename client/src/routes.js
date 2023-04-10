import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import Logout from "./pages/Logout";
import Product from "./pages/Product";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Login/>
            },
            {
                path: "home",
                element: <Homepage/>
            },
            {
                path: "cart",
                element: <Cart/>
            },
            {
                path:"product/:id",
                element: <Product/>
            },
            {
                path: "logout",
                element: <Logout/>
            },
            

        ]
    }
])

export default routes;