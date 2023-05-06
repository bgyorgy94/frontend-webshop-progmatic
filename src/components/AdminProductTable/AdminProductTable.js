import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom";
import productsService from "../../services/products-service";

export default function AdminProductTable() {
    const [products, setProducts] = useState([]);
    const [usp] = useSearchParams();

    useEffect(() => {
        productsService.getAllProducts()
        .then(json => {
            const originalProducts = (Object.values(json))
            const title = usp.get("title") ;
            const minimumPrice = usp.get("minimumPrice") || 0;
            const maximumPrice = usp.get("maximumPrice") || Number.MAX_SAFE_INTEGER;

            if (title !== null && title !== "") {
                setProducts(originalProducts.filter((product) => (
                    product.name === title && product.price >= minimumPrice && product.price <= maximumPrice
                )))
            }
            else {
                setProducts(originalProducts.filter((product) => (
                    product.price >= minimumPrice && product.price <= maximumPrice
                )))
            } 
        })
    }, [usp])

    return (
        <>
            {products.map((product, idx) => {
                return (
                    <tr key={idx}>
                        <th>{product.name}</th>
                        <th>{product.price}</th>
                        <th><Link to={`/admin/termekek/${product.id}/modositas`}>Módosítás</Link></th>
                        <th><Link to={`/admin/termekek/${product.id}/torles`}>Törlés</Link></th>
                    </tr>
                )
            })}
        </>
    )
}