import { useContext } from "react";
import UserOrderList from "../components/UserOrderList/UserOrderList";
import { UserContext } from "../contexts/userContext";

export default function UserOrders() {

    const [user] = useContext(UserContext);

    return (
        <>
        { user &&
            <div className="container">
                <div className="row text-center">
                <h2>Rendeléseim:</h2>
                </div>
                <UserOrderList user={user}/>
            </div>
        }
        </>
    )
}