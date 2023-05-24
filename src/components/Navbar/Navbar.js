import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import CartSum from "../CartSum/CartSum";
import DisplayUser from "../DisplayUser/DisplayUser"
import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap";
import "../Navbar/navbar.scss"
import { Cart } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';


export default function Navbar() {

    const [user] = useContext(UserContext);
    return (
        <BootstrapNavbar sticky="top" className="navbar">
            <Container>
                    <div className="d-inline-flex navbar-left">
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/termekek">Termékek</Nav.Link>
                    {user !== null && user.isAdmin ? <Nav.Link as={NavLink} to="/admin/termekek">Admin</Nav.Link> : ""}
                    </div>
                    <div className="d-inline-flex navbar-right">
                    <Nav.Link as={NavLink} to="/kosar"><Button type="button" class="btn btn-outline-primary"><Cart />{<CartSum />}</Button></Nav.Link>
                    {user ? <DisplayUser /> : ""}
                    {user ? "" : <Nav.Link as={NavLink} to="/belepes">Belépés</Nav.Link>}
                    </div>
            </Container>
        </BootstrapNavbar>
    )
}