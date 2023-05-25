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
                        <td className="d-none d-sm-table-cell"><img className="img-thumbnail" src={product.url}></img></td>
                        <td className="align-middle">{product.name}</td>
                        <td className="align-middle text-end">{product.price} Ft</td>
                        <td className="align-middle text-end">{cart[product.id]}</td>
                        <td className="align-middle text-end d-none d-md-table-cell">{(cart[product.id] * product.price) + "Ft" || "-"}</td>
                        <td className="align-middle"><button className="btn btn-outline-danger" onClick={() => {
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
        <td className="fw-bold">
            Összesen:
        </td>
        <td className="d-none d-sm-table-cell"/>
        <td />
        <td className="d-none d-md-table-cell"/>
        <td className="text-end fw-bold">
            {sumPrice + " Ft" || ""}
        </td>
        <td />
    </tr>
</tfoot>
        </>
    )
}