import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import TokenInterceptor from "../../utils/TokenInterceptor";
import jwt_decode from "jwt-decode";
import { getToken } from "../../utils/tokenHelper";
import Sidebar from "../../components/admin/SideNavbar";
import MainNav from "../../components/MainNav";
import { ToastContainer } from "react-toastify";


function AdminGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    console.log("Token", token);
    if (!token) {
      return navigate("/");
    }

    const decoded = jwt_decode(token);
    // Check asp identity role is admin.
    if (
      decoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ] !== "Admin"
    ) {
      return navigate("/");
    }
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <MainNav />
        </div>
      </div>
      <div className="row">
        <div className="container-fluid mt-4">
          <div className="row flex-nowrap mt-2">
            <Sidebar />
            <TokenInterceptor />
            <div className="col-sm-9 col-md-10 main-content">
            <ToastContainer/>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminGuard;
