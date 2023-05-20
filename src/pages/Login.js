import { useContext, useState } from "react";
import EmailInput from "../components/EmailInput/EmailInput";
import PasswordInput from "../components/PasswordInput/PasswordInput";
import { UserContext } from "../contexts/userContext";
import  userService from "../services/user-service";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../services/toastContext";


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const {showToast,setShowToast}  = useContext(ToastContext);
    
    console.log("render")
    return (
        <>
            <div>
                E-mail:
                <EmailInput value={email} getEmail={getEmail}/>
            </div>
            <div>
                Jelszó:
                <PasswordInput value={password} getPassword={getPassword}/>
            </div>
            <div>
                <button onClick={registrateButton}>Regisztráció</button>
                <button onClick={login}>Belépés</button>
            </div>
        </>
    )

    function getEmail(email) {
        setEmail(email);
    }

    function getPassword(password) {
        setPassword(password)
    }

    function login() {
        userService.signIn(email, password)
        .then(authResp => {
            if(authResp.registered) {
                localStorage.setItem("refreshToken", `${authResp.refreshToken}`)
                userService.getUserByID(authResp.localId)
                .then(resp => setUser(resp))
                navigate("/")
                setShowToast({
                    show: true,
                    message: "Sikeres bejelentkezés",
                    type: "success"
                })
            }
        })
        .catch(err => {setShowToast({
            show: true,
            message: "Sikertelen bejelentkezés",
            type: "error"
        })})
    }
    function registrateButton(){
        navigate("/regisztracio");
    }
}