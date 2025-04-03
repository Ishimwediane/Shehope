import React from "react";

import {Outlet} from 'react-router-dom'
import DashboardNavbar from "../admin/AdminNavbar";
import Sidebar  from "../admin/Sidebar";

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