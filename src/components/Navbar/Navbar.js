import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../contexts/cartContext";
import { UserContext } from "../../contexts/userContext";
import DisplayUser from "../DisplayUser/DisplayUser"

export default function Navbar() {

    const [user] = useContext(UserContext);
    const { cartContext } = useContext(CartContext);

    return (
        <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/termekek">Termékek</NavLink>
            <NavLink to="/admin">Admin</NavLink>
            <NavLink to="/kosar">Kosár ({Object.keys(cartContext).length})</NavLink>
            {user ? <DisplayUser /> : ""}
            {user ? "" : <NavLink to="/belepes">Belépés</NavLink>}
            {user ? <DisplayUser /> : "" }
        </div>
    )
}