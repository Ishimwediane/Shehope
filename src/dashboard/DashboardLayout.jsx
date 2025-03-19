import React from "react";

import {Outlet} from 'react-router-dom'
import DashboardNavbar from "./DashboardNavbar";
import Sidebar  from "./Sidebar";

const DashboardLayout =() => {
    return(
        <>
        <Sidebar />
<DashboardNavbar />
<Outlet />
        </>
    )
}
export default DashboardLayout