import { useContext } from "react"
import { UserContext } from "../../contexts/userContext"
import { ToastContext } from "../../services/toastContext";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cartContext";

export default function DisplayUser() {

    const [user, setUser] = useContext(UserContext);
    const {showToast, setShowToast} = useContext(ToastContext);
    const navigate = useNavigate();
    const location = useLocation();
    const {logOutCart} = useContext(CartContext);

    return (
        <>
            {user ? <>
                        <span>{user.firstName} {user.lastName}</span>
                        <NavLink to="/profil">Profil</NavLink>
                        <NavLink to="/megrendelesek">Rendeléseim</NavLink>
                        <button onClick={logout}>Kijelentkezés</button>
                    </>
                    : 
                    <span>{"Nem vagy bejelentkezve"}</span>}
        </>
            
    )

    function logout() {
        setUser(null)
        localStorage.removeItem("refreshToken")
        setShowToast({
            show: true,
            message: "Sikeres kijelentkezés",
            type: "success"
        })
        logOutCart();
        if(location.pathname === "/profil" || location.pathname === "/megrendelesek") {
            navigate("/")
        }
    }
}