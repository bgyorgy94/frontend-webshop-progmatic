import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom";
import productsService from "../../services/products-service";
import sortProducts from "../../services/sortProducts";
import pagerService from "../../services/pager-service";
import Pager from "../Pager/Pager";
import Toast from "../Toast/Toast";

export default function AdminProductTable({children}) {
    const [products, setProducts] = useState([]);
    const [usp] = useSearchParams();
    const pagerData = pagerService(usp)

    useEffect(() => {
        productsService.getAllProducts()
        .then(json => {
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
                    <thead>
                        <tr>
                            <th> {children}</th>
                        </tr>
                    </thead>
                <tbody>
                    {products.slice(pagerData.startIdx, pagerData.endIdx).map((product, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td><Link to={`/admin/termekek/${product.id}/modositas`}>Módosítás</Link></td>
                                <td><Link to={`/admin/termekek/${product.id}/torles`}>Törlés</Link></td>
                            </tr>)})}
                </tbody>
            </table>
            <Pager allProducts={products.length} itemsPerPage={pagerData.itemsPerPage} />
        </>
    )
}