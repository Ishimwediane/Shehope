import React from "react";

import {Outlet} from 'react-router-dom'
import AdminNavbar from "./AdminNavbar";
import Sidebar  from "./Sidebar";

const DashboardLayout =() => {
    return(
        <>
        <Sidebar />
<AdminNavbar />
<Outlet />
        </>
    )
}
export default DashboardLayout