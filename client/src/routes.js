import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import Logout from "./pages/Logout";
import Product from "./pages/Product";
import Registration from "./pages/Registration";
import Order from "./pages/Order.js";
import AdminGuard from "./pages/admin/AdminGuard";
import Dashboard from "./pages/admin/Dashboard";
import MyOrders from "./pages/MyOrders";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Customers from "./pages/admin/Customers";

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
                path: "registration",
                element: <Registration/>
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
            {
                path: "order/:quantity",
                element: <Order/>
            },
            {
                path: "myorders",
                element: <MyOrders/>
            }

        ]
    },
    {
        path: "/admin",
        element: <AdminGuard/>,
        children: [
            {
                path: "/admin",
                element: <Dashboard/>
            },
            {
                path: "/admin/products",
                element: <Products/>
            },
            {
                path: "/admin/orders",
                element: <Orders/>
            },
            {
                path: "/admin/customers",
                element: <Customers/>
            }
        ]
    }
])

export default routes;