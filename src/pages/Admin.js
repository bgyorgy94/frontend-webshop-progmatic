import { Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

export default function Admin() {
    return(
        <div>
            Admin
            <Outlet />
        </div>
    )
}