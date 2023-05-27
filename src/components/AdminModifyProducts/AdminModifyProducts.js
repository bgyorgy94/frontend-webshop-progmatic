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
        description:"",
        categoryId: ""
    })
    const [categoryList, setCategoryList] = useState([])
    const navigate=useNavigate();
    const {showToast,setShowToast}  = useContext(ToastContext);
    const [formData,setFormData] = useState({product});

    useEffect( () => {
        productsService.getProduct(id)
        .then(json=> {
            setProduct({
            id: json.id,
            name: json.name,
            price: json.price,
            description: json.description,
            categoryId: json.categoryId
        })
            setFormData({
            id: json.id,
            name: json.name,
            price: json.price,
            description: json.description,
            categoryId: json.categoryId
        })

    })
        .catch(err => {
            setShowToast({
                show:true,
                message:`Hiba történt: ${err}`,
                type:"error"})
            navigate("/admin/termekek");
        })
        
        categoryService.getAllCategories()
        .then(json => setCategoryList(Object.values(json)))

    },[])
    

    return(
        <div className="container mt-3">
        <div className="row  text-center">
            <h2>Termék módosítása</h2>
        </div>
        <div className=" input-group row">
            <form>
                <div className="form-floating mt-2">
                    <input   
                    defaultValue={formData.name}
                        type="text" 
                        onChange={(e) => {
                            setFormData({...formData,name: e.target.value})
                        }}
                        className="form-control"
                        placeholder="Termék neve"
                        id="floatingName"
                    />          
                    <label for="floatingName">Termék neve: {product.name}</label>
                </div>
                <div className="form-floating mt-2">
                    <input  
                        defaultValue={formData.price}
                        type="text" 
                        onChange={(e) => setFormData({...formData,price: e.target.value})}
                        name="floatingPrice"
                        className="form-control "
                        placeholder="Termék ára"
                        id="floatingPrice"
                    />
                    <label for="floatingPrice">Termék ára: {product.price}</label>
                </div>
                <div className="form-floating mt-2">
                    <textarea  
                        defaultValue={formData.description}
                        onChange={(e) => setFormData({...formData,description: e.target.value})}
                        name="floatingDescription"
                        className="form-control "
                        placeholder="Termék leírása"
                        id="floatingDescription"
                    />
                    <label for="floatingDescription">Termék leírása: {product.description}</label>
                </div>

                <div className="form-floating mt-2">
                    <select name="category" className="form-select" id="floatingSelect" aria-label="Kategória"
                        defaultValue={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value})}>
                        {categoryList.map((category, idx) => {
                        return (<option key={idx+1} defaultValue={category.id} selected={category.id === product.categoryId ? true : false}>{category.name}</option>)
                            })}
                    </select>
                    <label for="floatingSelect"> Termék kategória: {categoryList.map((category => {
                        if (category.id === product.categoryId) return category.name
                        }))}
                    </label> 
                </div>
                <div className=" d-flex align-items-center justify-content-center flex-wrap">
                    <button onClick={modifyProductButton} className="btn btn-outline-secondary m-1">módosít</button>
                    <button onClick={cancelButton} className="btn btn-outline-secondary m-1">mégsem</button>
                </div>
            </form>
        </div>
    </div>
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