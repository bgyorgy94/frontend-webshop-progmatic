import { Link, Navigate, Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export default function Admin() {
    const [user] = useContext(UserContext)

    if(user === null || !user.isAdmin) {
        return <Navigate to={"/belepes"}/>
    }
    return(
        <div>
            Admin
            <Link to="./termek-felvitel">Új termék</Link>
            <Outlet />
        </div>
    )
}