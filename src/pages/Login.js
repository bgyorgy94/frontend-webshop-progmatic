import { useContext, useState } from "react";
import EmailInput from "../components/EmailInput/EmailInput";
import PasswordInput from "../components/PasswordInput/PasswordInput";
import { EmailContext } from "../contexts/emailContext";
import { PasswordContext } from "../contexts/passwordContext";
import { UserContext } from "../contexts/userContext";
import  userService from "../services/user-service";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../services/toastContext";


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const {showToast, setShowToast} = useContext(ToastContext);
    
    return (
        <EmailContext.Provider value={[email, setEmail]}>
        <PasswordContext.Provider value={[password, setPassword]}>
        <>
            <div>
                E-mail:
                <EmailInput/>
            </div>
            <div>
                Jelszó:
                <PasswordInput/>
            </div>
            <div>
                <button onClick={registrateButton}>Regisztráció</button>
                <button onClick={login}>Belépés</button>
            </div>
        </>
        </PasswordContext.Provider>
        </EmailContext.Provider>
    )

    function login() {
        userService.signIn(email, password)
        .then(authResp => {
            if(authResp.registered) {
                userService.getSignedInUserData(authResp.email)
                .then(resp => setUser(resp))
                .then(setShowToast({
                    show: true,
                    message: "Sikeres bejelentkezés",
                    type: "success"
                }))
                navigate("/")
            }
            else {
                setShowToast({
                    show: true,
                    message: "Helytelen e-mail cím/jelszó",
                    type: "error"
                })
            }
        })
    }
    function registrateButton(){
        navigate("/regisztracio");
    }
}