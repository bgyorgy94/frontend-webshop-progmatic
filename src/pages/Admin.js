import { Link, Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

export default function Admin() {
    return(
        <div>
            Admin
            <Link to="./termek-felvitel">Új termék</Link>
            <Outlet />
        </div>
    )
}