import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../contexts/cartContext";
import { UserContext } from "../../contexts/userContext";
import CartSum from "../CartSum/CartSum";
import DisplayUser from "../DisplayUser/DisplayUser"

export default function Navbar() {

    const [user] = useContext(UserContext);
    const { cartContext } = useContext(CartContext);

    return (
        <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/termekek">Termékek</NavLink>
            <NavLink to="/admin">Admin</NavLink>
            <NavLink to="/kosar">Kosár ({<CartSum />})</NavLink>
            {user ? <DisplayUser /> : ""}
            {user ? "" : <NavLink to="/belepes">Belépés</NavLink>}
        </div>
    )
}