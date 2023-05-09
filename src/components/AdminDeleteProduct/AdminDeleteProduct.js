import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productsService from "../../services/products-service";
import { useContext } from "react";
import { ToastContext } from "../../services/toastContext.js";

export default function AdminDeleteProduct() {
    const {showToast, setShowToast} = useContext(ToastContext);
    const [product,setProduct] = useState({});
    let {id} = useParams();
    const navigate= useNavigate()

    useEffect( () =>{
        productsService.getProduct(id)
        .then(json => setProduct({
            id: json.id,
            name: json.name,
            price: json.price
        }))
        .catch(err => {
            setShowToast({
                show:true,
                message:`Hiba történt:${err} `,
                type:"error"
            });
            navigate("/admin/termekek");
        })
    },[])
    

    
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
        setShowToast({
            show:true,
            message:"Sikeres törlés",
            type:"success"
        });
        navigate("/admin/termekek")
    }
    function cancelButtonHandler(){
        navigate("/admin/termekek")
    }
    
    
}