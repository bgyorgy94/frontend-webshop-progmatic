import { useContext } from "react"
import { UserContext } from "../../contexts/userContext"

export default function DisplayUser() {

    const [user] = useContext(UserContext);

    return (
        <>
            {user}
            <button>Kijelentkezés</button>
        </>
    )
}