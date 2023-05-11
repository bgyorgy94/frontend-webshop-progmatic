import { useContext, useState } from "react"
import { CartContext } from "../../contexts/cartContext";

export default function CartList() {
    const { cartContext, setCartContext } = useContext(CartContext);
    const [cartArray, setCartArray] = useState(Object.values(cartContext));

    return (
        <>
            {cartArray.map((product) => {
                return (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.pcs}</td>
                        <td>{product.price * product.pcs}</td>
                        <td><button onClick={() => productDelete(product.id)}>Törlés</button></td>
                    </tr>
                )
            })}
        </>
    )

    function productDelete(id) {
        delete cartContext[id]

        setCartContext(cartContext)
        setCartArray(Object.values(cartContext))
    }
}