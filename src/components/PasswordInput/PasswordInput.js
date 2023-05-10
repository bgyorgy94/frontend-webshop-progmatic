import { useState } from "react";

export default function PasswordInput() {
    const [password, setPassword] = useState("");

    return(
        <input type="password" value={password} onChange={typePassword}></input>
    )

    function typePassword(e) {
        setPassword(e.target.value)
    }
}