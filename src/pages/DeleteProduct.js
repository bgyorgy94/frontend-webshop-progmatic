import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productsService from "../services/products-service.js";

export default function DeleteProduct() {
    const [product,setProduct] = useState({});
    let {id} = useParams();
    const navigate= useNavigate()

    useEffect( () =>{
        productsService.getProduct(id)
        .then(json => setProduct(json));
        console.log(product.name)
    },[]


    )
    return(
        <div>
            <h2>Biztosan törli a terméket?</h2>
            <p>{product.name}</p>
            <button onClick={deleteButtonHandler}>törlés</button>
            <button onClick={cancelButtonHandler}>mégsem</button>
        </div>
    )
    function deleteButtonHandler(){
        productsService.deleteProduct(id, successCallback);
    }
    function successCallback(){
        console.log("torolve");
        navigate("/admin/termekek")
    }
    function cancelButtonHandler(){
        navigate("/admin/termekek")
    }
}