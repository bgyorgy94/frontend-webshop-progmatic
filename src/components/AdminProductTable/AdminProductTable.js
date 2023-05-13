import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom";
import productsService from "../../services/products-service";
import sortProducts from "../../services/sortProducts";
import productPager from "../../services/product-pager";
import Pager from "../Pager/Pager";
import Toast from "../Toast/Toast";

export default function AdminProductTable() {
    const [products, setProducts] = useState([]);
    const [usp] = useSearchParams();
    const pagerData = productPager(usp)

    useEffect(() => {
        productsService.getAllProducts()
        .then(json => {
            console.log(json)
            const originalProducts = (Object.values(json))
            const title = usp.get("title") ;
            const minimumPrice = usp.get("minimumPrice") || 0;
            const maximumPrice = usp.get("maximumPrice") || Number.MAX_SAFE_INTEGER;

            if (title !== null && title !== "") {
                return(originalProducts.filter((product) => (
                    product.name === title && Number(product.price) >= Number(minimumPrice) && Number(product.price) <= Number(maximumPrice)
                )))
            }
            else {
                return(originalProducts.filter((product) => (
                    Number(product.price) >= Number(minimumPrice) && Number(product.price) <= Number(maximumPrice)
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
            <table>
                {products.slice(pagerData[0], pagerData[1]).map((product, idx) => {
                    return (
                            <tr key={idx}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td><Link to={`/admin/termekek/${product.id}/modositas`}>Módosítás</Link></td>
                                <td><Link to={`/admin/termekek/${product.id}/torles`}>Törlés</Link></td>
                            </tr>)})}
            </table>
            <Pager allProducts={products.length} productsPerPage={pagerData[2]} />
                    
            
        </>
    )
}