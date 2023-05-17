import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartList from "../components/CartList/CartList";
import { CartContext } from "../contexts/cartContext";
import orderService from "../services/order-service";
import { UserContext } from "../contexts/userContext";

export default function Cart() {
    const {cart, emptyCart} = useContext(CartContext)
    const [user] = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <>
            {Object.keys(cart).length === 0 ?
                <>A kosár üres</>
                :
                <>
                    <p>Kosár:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Termék neve</th>
                                <th>Termék ára</th>
                                <th>Mennyiség</th>
                                <th>Összesen</th>
                            </tr>
                        </thead>
                            <CartList />
                    </table>
                    <button onClick={() => orderService.sendOrder(cart, user).then(() => emptyCart())}>Megrendelem</button>
                </>
            }
        </>
    )
}