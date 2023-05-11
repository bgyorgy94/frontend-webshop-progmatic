import { useSearchParams } from "react-router-dom";
import productsService from "../../services/products-service";
import { useContext, useEffect, useState } from "react";
import sortProducts from "../../services/sortProducts";
import { CartContext } from "../../contexts/cartContext";
export default function ProductList() {

    const [products, setProducts] = useState([]);
    const [usp] = useSearchParams();
    const { cartContext, setCartContext } = useContext(CartContext)

    useEffect(() => {
        productsService.getAllProducts()
            .then(json => {
                const originalProducts = (Object.values(json))
                const title = usp.get("title");
                const minimumPrice = usp.get("minimumPrice") || 0;
                const maximumPrice = usp.get("maximumPrice") || Number.MAX_SAFE_INTEGER;

                if (title !== null && title !== "") {
                    return (originalProducts.filter((product) => (
                        product.name === title && Number(product.price) >= Number(minimumPrice) && Number(product.price) <= Number(maximumPrice)
                    )))
                }
                else {
                    return (originalProducts.filter((product) => (
                        Number(product.price) >= Number(minimumPrice) && Number(product.price) <= Number(maximumPrice)
                    )))
                }
            })
            .then(json => {
                const sortBy = usp.get("sortBy");
                const direction = usp.get("direction");
                setProducts(sortProducts(json, sortBy, direction))
            })
    }
        , [usp])

    return (
        <ul>
            {products.map((product, idx) => {
                return (
                    <li key={idx}>
                        <p> Termék neve: {product.name} </p>
                        <p> Ár: {product.price} </p>
                        <p><button onClick={() => addToCart(product)}>Kosárba</button></p>
                    </li>
                )
            })}

        </ul>

    )

    function addToCart(product) {

        if (cartContext[product.id] == undefined) {
            cartContext[product.id] = {
                id: product.id,
                name: product.name,
                price: product.price,
                pcs: 1
            }
        } else {
            cartContext[product.id]["pcs"] = cartContext[product.id]["pcs"] + 1;
        }

        setCartContext(cartContext);
    }

}