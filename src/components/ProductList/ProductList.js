import { useSearchParams } from "react-router-dom";
import productsService from "../../services/products-service";
import { useEffect, useState } from "react";
export default function ProductList (){

    const [products, setProducts] = useState([]);
    const [usp] = useSearchParams();
    
    useEffect( () => {
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
        console.log("products:",products)
    }
    ,[usp])
    
    return( 
        <ul>
            {products.map((product,idx) => {
                return(
                <li key={idx}> 
                    <p> Termék neve: {product.name} </p>
                    <p> Ár: {product.price} </p>
                </li>
                )
            })}    
            
        </ul>

)
    
        

}