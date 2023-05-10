import { useState } from "react";
import "./emailInput.css"

export default function EmailInput() {
    const [email, setEmail] = useState("");
    const [invalidMessage, setInvalidMessage] = useState("valid-email")

    return (
        <>
            <input type="email" value={email} onChange={typeEmail} onBlur={validateEmail}></input>
            <span id="invalid-email-message" className={invalidMessage}>Az e-mail cím nem megfelelő</span>
        </>
    )

    function typeEmail(e) {
        setEmail(e.target.value)
    }

    function validateEmail() {
        if (!/\S+@\S+\.\S+/.test(email)) {
            setInvalidMessage("invalid-email")
        } else {
            setInvalidMessage("valid-email")
        }
    }


}