import jwt_decode from "jwt-decode";

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const removeToken = () => {
    localStorage.removeItem('token');
    // window.location.reload();
};

export const setSecNavbar = (value) => {
    localStorage.setItem('SecNavbar',value);
    

}

export const getSecNavbar = () => {
    return localStorage.getItem('SecNavbar');
}

export const isAdministrator = () => {
    const token = getToken();
    if (!token) {
        return false;
    }

    const decoded = jwt_decode(token);
    // Check asp identity role is admin.
    return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin';
}