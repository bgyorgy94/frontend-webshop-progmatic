import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import productsService from "../../services/products-service.js"
import validation from "../../services/validation.js";
import { useContext } from "react";
import { ToastContext } from "../../services/toastContext.js";
import categoryService from "../../services/category-service.js";

export default function ModifyProduct() {
    const {id}= useParams();
    const [product, setProduct] = useState({
        id:"",
        name:"",
        price:"",
        categoryId: ""
    })
    const [categoryList, setCategoryList] = useState([])
    const navigate=useNavigate();
    const {showToast,setShowToast}  = useContext(ToastContext);

    useEffect( () => {
        productsService.getProduct(id)
        .then(json=> setProduct({
            id: json.id,
            name: json.name,
            price: json.price,
            categoryId: json.categoryId
        }))
        .catch(err => {
            setShowToast({
                show:true,
                message:`Hiba történt: ${err}`,
                type:"error"})
            navigate("/admin/termekek");
        })
    },[])

    useEffect(() => {
        categoryService.getAllCategories()
        .then(json => setCategoryList(Object.values(json)))
    }, [])

    console.log(categoryList)
    
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

            <p> Termék kategória: {categoryList.map((category => {
                if (category.id === product.categoryId) return category.name
            }))}</p> 
            <select value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value})}>
                <option key={0} value={""}>---</option>  
                {categoryList.map((category, idx) => {
                    return (<option key={idx+1} value={category.id} selected={category.id === product.categoryId ? true : false}>{category.name}</option>)
                })}
            </select>
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