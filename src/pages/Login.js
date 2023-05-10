import EmailInput from "../components/EmailInput/EmailInput";
import PasswordInput from "../components/PasswordInput/PasswordInput";


export default function Login() {
    return (
        <>
            <div>
                E-mail:
                <EmailInput />
            </div>
            <div>
                Jelszó:
                <PasswordInput />
            </div>
            <div>
                <button>Regisztráció</button>
                <button>Belépés</button>
            </div>
        </>
    )
}