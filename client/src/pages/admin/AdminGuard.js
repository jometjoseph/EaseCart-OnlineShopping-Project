import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import TokenInterceptor from '../../utils/TokenInterceptor';
import jwt_decode from "jwt-decode";
import { getToken } from '../../utils/tokenHelper';
import Sidebar from '../../components/admin/SideNavbar';

function AdminGuard() {

    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        console.log("Token", token);
        if (!token) {
            return navigate('/');
        }

        const decoded = jwt_decode(token);
        // Check asp identity role is admin.
        if (decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] !== 'Admin') {
            return navigate('/');
        }
    }, []);
    return (
        <div className="app container-fluid">
              <div className="row flex-nowrap">
            <Sidebar/>
            <TokenInterceptor />
            <div className='container-fluid'>
                <Outlet />
            </div>
        </div>
        </div>
    )
}

export default AdminGuard;