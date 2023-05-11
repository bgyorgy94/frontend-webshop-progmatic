import { useContext, useState } from "react";
import { PasswordContext } from "../../contexts/passwordContext";

export default function PasswordInput() {
    const [password, setPassword] = useContext(PasswordContext);

    return(
        <input type="password" value={password} onChange={typePassword}></input>
    )

    function typePassword(e) {
        setPassword(e.target.value)
    }
}