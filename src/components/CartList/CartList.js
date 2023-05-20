import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../contexts/cartContext";
import { UserContext } from "../../contexts/userContext";
import productsService from "../../services/products-service";
import { ToastContext } from "../../services/toastContext";
export default function CartList() {
    const [user] = useContext(UserContext);
    const { cart, deleteFromCart } = useContext(CartContext);
    const [cartArray, setCartArray] = useState([]);
    let sumPrice = 0;
    cartArray.forEach((product) => {sumPrice += (cart[product.id] * product.price)})
    const {showToast,setShowToast}  = useContext(ToastContext);
    
    useEffect(() => {Promise.all(Object.keys(cart).map(id => productsService.getProduct(id)))
                .then((arr) => setCartArray(arr))}, [cart]);

    return (
        <>
        <tbody>
            {cartArray.map((product) => {
                return (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{cart[product.id]}</td>
                        <td>{(cart[product.id] * product.price) || "-"}</td>
                        <td><button onClick={() => {
                            deleteFromCart(product.id)
                            setShowToast({
                                show:true,
                                message:`A termék eltávolítva a kosárból`,
                                type:"success"})
                            }}>Törlés</button></td>
                    </tr>
                )
            })}
</tbody>
<tfoot>
    <tr>
        <td>
            Összesen:
        </td>
        <td />
        <td />
        <td>
            {sumPrice || ""}
        </td>
    </tr>
</tfoot>
        </>
    )
}