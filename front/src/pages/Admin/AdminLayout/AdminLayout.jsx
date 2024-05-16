import { Outlet } from "react-router-dom";
import Header from "../../../components/Header/Header";
import SideMenu from "../../../components/Admin/SideMenu";
import React from "react";

const AdminLayout = () => {

    return (

        <React.Fragment>

            <Header />
        
            <SideMenu />
        
            <Outlet />
        
       </React.Fragment>

    )
}

export default AdminLayout;
