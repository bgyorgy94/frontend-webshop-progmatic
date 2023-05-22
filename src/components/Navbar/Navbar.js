import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import CartSum from "../CartSum/CartSum";
import DisplayUser from "../DisplayUser/DisplayUser"
import { Navbar as BootstrapNavbar } from "react-bootstrap";


export default function Navbar() {

    const [user] = useContext(UserContext);
    return (
        <BootstrapNavbar bg="warning">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/termekek">Termékek</NavLink>
            <NavLink to="/admin">Admin</NavLink>
            <NavLink to="/kosar">Kosár ({<CartSum />})</NavLink>
            {user ? <DisplayUser /> : ""}
            {user ? "" : <NavLink to="/belepes">Belépés</NavLink>}
        </BootstrapNavbar>
    )
}