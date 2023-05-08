import { useSearchParams } from "react-router-dom";
import productsService from "../../services/products-service";
import { useEffect, useState } from "react";
import sortProducts from "../../services/sortProducts";
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