import { useContext } from "react"
import { UserContext } from "../../contexts/userContext"
import { ToastContext } from "../../services/toastContext";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function DisplayUser() {

    const [user, setUser] = useContext(UserContext);
    const {showToast, setShowToast} = useContext(ToastContext);
    const navigate = useNavigate();
    const location = useLocation();

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
        setShowToast({
            show: true,
            message: "Sikeres kijelentkezés",
            type: "success"
        })
        if(location.pathname === "/profil" || location.pathname === "/megrendelesek") {
            navigate("/")
        }
    }
}