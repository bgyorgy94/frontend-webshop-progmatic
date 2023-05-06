import productsService from "../../services/products-service";
import { useEffect, useState } from "react";
export default function ProductList (){

    const [products, setProducts] = useState([]);
    
    useEffect( () => {
        productsService.getAllProducts()
        .then(json => {
    
            setProducts(Object.values(json))
        })
        console.log("products:",products)
    }

    ,[])
    
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