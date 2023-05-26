import React from "react";
import { Navigate,Outlet } from 'react-router-dom';

const Private=()=>{
        const auth=localStorage.getItem('user');
        const admin=localStorage.getItem('admin');
        return auth || admin ?<Outlet />:<Navigate to='/signup' />
}

export default Private;