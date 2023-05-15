import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CartList from "../components/CartList/CartList";
import { CartContext } from "../contexts/cartContext";

export default function Cart() {
    const {cart} = useContext(CartContext)
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
                    <button onClick={orderButtonHandler}>Megrendelem</button>
                </>
            }
        </>
    )

    function orderButtonHandler() {
        navigate("/megrendeles")
    }
}