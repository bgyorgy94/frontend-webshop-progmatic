import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import productsService from "../../services/products-service";

export default function AdminProductTable() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        productsService.getAllProducts()
            .then(json => setProducts(Object.values(json)))
    }, [])

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