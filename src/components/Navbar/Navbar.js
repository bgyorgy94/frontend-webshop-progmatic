import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import DisplayUser from "../DisplayUser/DisplayUser"

export default function Navbar() {

    const [user] = useContext(UserContext);

    return(
        <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/termekek">Termékek</NavLink>
            <NavLink to="/admin">Admin</NavLink>
            {user ? "" : <NavLink to="/belepes">Belépés</NavLink>}
            {user ? <DisplayUser /> : "" }
        </div>
    )
}