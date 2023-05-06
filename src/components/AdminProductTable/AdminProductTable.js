import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom";
import productsService from "../../services/products-service";
import sortProducts from "../../services/sortProducts";

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
                return(originalProducts.filter((product) => (
                    product.name === title && product.price >= minimumPrice && product.price <= maximumPrice
                )))
            }
            else {
                return(originalProducts.filter((product) => (
                    product.price >= minimumPrice && product.price <= maximumPrice
                )))
            } 
        })
        .then(json => {
            const sortBy = usp.get("sortBy");
            const direction = usp.get("direction");
            setProducts(sortProducts(json, sortBy, direction))})
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