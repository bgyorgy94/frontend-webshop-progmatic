import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import './Admin/admin.scss'

export default function Admin() {
    const [user] = useContext(UserContext)

    if (user === null || !user.isAdmin) {
        return <Navigate to={"/belepes"} />
    }
    return (
        <div className="admin-menu ">
            <ul className="nav nav-tabs col-md-10">
                <li>
                    <NavLink className="nav-link" to="/admin/termekek">Termékek</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/admin/termek-felvitel">Új termék</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/admin/kategoriak">Kategóriák</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/admin/uj-kategoria">Új kategória</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/admin/vasarlok">Vásárlók</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/admin/megrendelesek">Megrendelések</NavLink>
                </li>
            </ul>
            <Outlet />
        </div>
    )
}