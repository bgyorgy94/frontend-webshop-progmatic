import { useContext } from "react";
import CartList from "../components/CartList/CartList";
import { CartContext } from "../contexts/cartContext";

export default function Cart() {
    const { cartContext } = useContext(CartContext);

    return (
        <>
            {Object.keys(cartContext).length === 0 ?
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
                        <tbody>
                            <CartList />
                        </tbody>
                    </table>
                </>
            }
        </>
    )
}