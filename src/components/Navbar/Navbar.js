import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import CartSum from "../CartSum/CartSum";
import DisplayUser from "../DisplayUser/DisplayUser"
import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap";
import "../Navbar/navbar.scss"


export default function Navbar() {

    const [user] = useContext(UserContext);
    return (
        <BootstrapNavbar sticky="top" className="navbar">
            <Container>
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/termekek">Termékek</Nav.Link>
                    {user !== null && user.isAdmin ? <Nav.Link as={NavLink} to="/admin">Admin</Nav.Link> : ""}
                    <Nav.Link as={NavLink} to="/kosar">Kosár ({<CartSum />})</Nav.Link>
                    {user ? <DisplayUser /> : ""}
                    {user ? "" : <Nav.Link as={NavLink} to="/belepes">Belépés</Nav.Link>}
            </Container>
        </BootstrapNavbar>
    )
}