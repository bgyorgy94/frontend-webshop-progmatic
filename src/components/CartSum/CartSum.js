import { useContext } from "react";
import { CartContext } from "../../contexts/cartContext";

export default function CartSum() {
    const {cartContext, setCartContext} = useContext(CartContext);
    let sum = 0;
    Object.values(cartContext).forEach((product) => sum = sum + product.pcs);
    
    return sum;
}