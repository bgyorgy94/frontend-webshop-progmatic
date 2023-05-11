import { useContext } from "react"
import { UserContext } from "../contexts/userContext"

export default function UserProfile() {

    const [user] = useContext(UserContext);

        return (
            <>
                <p>Vezetéknév: {user.lastName}</p>
                <p>Keresztnév: {user.firstName}</p>
                <p>E-mail cím: {user.email}</p>
            </>
        )
}