import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import productsService from "../../services/products-service.js"


export default function ModifyProduct() {
    const {id}= useParams();
    const [product, setProduct] = useState({
        id:"",
        name:"",
        price:""
    })
    const navigate=useNavigate();

    useEffect( () => {
        productsService.getProduct(id)
        .then(json=> setProduct({
            id: json.id,
            name: json.name,
            price: json.price
        }));
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
        productsService.updateProduct(id,formData)
        .then(json => console.log("sikeres modositas:",json))
        navigate("/admin/termekek");
    }
    function cancelButton () {
        navigate("/admin/termekek");

    }
}