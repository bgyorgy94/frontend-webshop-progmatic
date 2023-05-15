import { useEffect, useState } from "react";

export default function PasswordInput(props) {
    const [password, setPassword] = useState("");

    useEffect(() => {
        props.getPassword(password)
    }, [password])

    return(
        <input type="password" value={password} onChange={typePassword}></input>
    )

    function typePassword(e) {
        setPassword(e.target.value)
    }
}