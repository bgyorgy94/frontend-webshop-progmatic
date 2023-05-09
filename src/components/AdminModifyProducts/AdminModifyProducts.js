import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import productsService from "../../services/products-service.js"
import validation from "../../services/validation.js";
import { useContext } from "react";
import { ToastContext } from "../../services/toastContext.js";

export default function ModifyProduct() {
    const {id}= useParams();
    const [product, setProduct] = useState({
        id:"",
        name:"",
        price:""
    })
    const navigate=useNavigate();
    const {showToast,setShowToast}  = useContext(ToastContext);

    useEffect( () => {
        productsService.getProduct(id)
        .then(json=> setProduct({
            id: json.id,
            name: json.name,
            price: json.price
        }))
        .catch(err => {
            setShowToast({
                show:true,
                message:`Hiba történt: ${err}`,
                type:"error"})
            navigate("/admin/termekek");
        })
    },[])

    const [formData,setFormData] = useState({product});

    return(
        <form>
            <h2>Termék módosítása</h2>
            <p> Termék neve: {product.name} </p> 
            <input   
            value={formData.name}
                type="text" 
                onChange={(e) => {
                    setFormData({...formData,name: e.target.value})
                }}
            />

            <p> Termék ára: {product.price} </p> 
            <input  
                value={formData.price}
                type="text" 
                onChange={(e) => setFormData({...formData,price: e.target.value})}
            />
            <p>
                <button onClick={modifyProductButton}>módosít</button>
                <button onClick={cancelButton}>mégsem</button>
            
            </p>
            

        </form>

    )
    function modifyProductButton (e) {
        e.preventDefault();
        if (validation(formData.name, formData.price)) {
            productsService.updateProduct(id,formData)
            .then(json => {
                setShowToast({
                    show:true,
                    message:`Sikeresen módosítva: ${json.name}`,
                    type:"success"
                })
                navigate("/admin/termekek");
            });
        }
    }
    function cancelButton () {
        navigate("/admin/termekek");

    }
}