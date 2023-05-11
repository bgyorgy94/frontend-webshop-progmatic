import { useState, useContext } from "react";
import { EmailContext } from "../../contexts/emailContext";
import "./emailInput.css"

export default function EmailInput() {
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [email, setEmail] = useContext(EmailContext);

    return (
        <>
            <input type="email" onChange={typeEmail} onBlur={validateEmail}></input>
            {invalidEmail && <span id="invalid-email-message">Az e-mail cím nem megfelelő</span>}
        </>
    )

    function typeEmail(e) {
        setEmail(e.target.value)
    }

    function validateEmail() {
        if (!/\S+@\S+\.\S+/.test(email)) {
            setInvalidEmail(true)
        } else {
            setInvalidEmail(false)
        }
    }


}