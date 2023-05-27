import { useContext } from "react";
import UserOrderList from "../components/UserOrderList/UserOrderList";
import { UserContext } from "../contexts/userContext";
import Filter from "../components/Filter/Filter";

export default function UserOrders() {

    const [user] = useContext(UserContext);

    return (
        <>
        { user &&
            <div className="container">
                <h2>Rendeléseim:</h2>
                <Filter type="item"/>
                <div className="row text-center">
                </div>
                <UserOrderList user={user}/>
            </div>
        }
        </>
    )
}