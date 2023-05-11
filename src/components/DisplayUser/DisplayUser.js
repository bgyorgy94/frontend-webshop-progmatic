import { useContext } from "react"
import { UserContext } from "../../contexts/userContext"
import { ToastContext } from "../../services/toastContext";

export default function DisplayUser() {

    const [user, setUser] = useContext(UserContext);
    const {showToast, setShowToast} = useContext(ToastContext);

    return (
        <>
            <span>{user.lastName} {user.firstName}</span>
            <button onClick={logout}>Kijelentkezés</button>
        </>
    )

    function logout() {
        setUser(null)
        setShowToast({
            show: true,
            message: "Sikeres kijelentkezés",
            type: "success"
        })
    }
}