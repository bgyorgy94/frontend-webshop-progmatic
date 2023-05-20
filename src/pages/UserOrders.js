import { useContext } from "react";
import UserOrderList from "../components/UserOrderList/UserOrderList";
import { UserContext } from "../contexts/userContext";

export default function UserOrders() {

    const [user] = useContext(UserContext);

    return (
        <>
        { user &&
            <>
                <h2>Rendeléseim:</h2>
                <UserOrderList user={user}/>
            </>
        }
        </>
    )
}