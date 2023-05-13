import { useState, useEffect } from "react";
import "./emailInput.css"

export default function EmailInput(props) {
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [email, setEmail] = useState("");

    useEffect(() => {
        props.getEmail(email)
    }, [email])

    return (
        <>
            <input type="email" value={email} onChange={typeEmail} onBlur={validateEmail}></input>
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