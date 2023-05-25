import { useState, useContext, useEffect } from "react";
import productsService from "../services/products-service";
import { ToastContext } from "../services/toastContext"
import { app } from "../firebase/firebaseConfig"
import {getDownloadURL, getStorage,ref, uploadBytes} from "firebase/storage"
import categoryService from "../services/category-service";

export default function AddProduct() {
    const {showToast,setShowToast}  = useContext(ToastContext);
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [file,setFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState(null);
    const [category, setCategory] = useState("")
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        categoryService.getAllCategories()
        .then(json => setCategoryList(Object.values(json)))
    }, [])

    return (
        <div className="container mt-3">
            <div className="row  text-center">
                <h1>Új termék létrehozása</h1>
            </div>
            <div className=" input-group row">
                <form onSubmit={handlerSubmit}>
                    <div className="form-floating mt-2">
                        <input type="text" onChange={handleTitleChange} value={title} name="floatingName" className="form-control " placeholder="Termék neve" id="floatingName"/>
                        <label for="floatingName">Termék neve</label>
                    </div>
                    <div className="form-floating mt-2">
                        <input type="number" onChange={handlePriceChange} value={price} name="floatingPrice" className="form-control " placeholder="Termék ára" id="floatingPrice"/>
                        <label for="floatingPrice">Termék ára</label>
                    </div>
                    <div classNsme="mt-2">
                        <label for="formFile" class="form-label">Termék képe:</label>
                        <input type="file" name="formFile" id="formFile" className="form-control"onChange={fileChange} />
                    </div>
                    <div className="form-floating mt-2">
                        <select defaultValue={""} onChange={handleCategoryChange} name="category" class="form-select" id="floatingSelect" aria-label="Kategória">
                            <option key={0} value={""}>---</option>
                            {categoryList.map((category, idx) => {
                                return (<option key={idx+1} value={category.id}>{category.name}</option>)
                            })}
                        </select>
                        <label for="floatingSelect">Kategória</label>
                    </div>
                    <div className=" d-flex align-items-center justify-content-center flex-wrap">
                        <button className="btn btn-outline-secondary m-1">Termék létrehozása</button>
                    </div>
                </form>
            </div>
        </div>
    )

    function handleTitleChange(e) {
        let value = e.target.value;
        setTitle(value)
    }
    function handlePriceChange(e) {
        let value = e.target.value;
        setPrice(value)
    }
    function fileChange(e){
        setFile(e.target.files[0])
    }

    function handleCategoryChange(e) {
        setCategory(e.target.value)
    }

    function handlerSubmit(e) {
        e.preventDefault()
                    
        const storage = getStorage(app)
        const fileRef = ref(storage, "images/"+file.name);
        uploadBytes(fileRef,file)
        .then( (uploadResult) => {
             getDownloadURL(uploadResult?.ref)
             .then(url => {            
                 productsService.createProduct({
                     name: title,
                     price: price,
                     url: url,
                     categoryId: category
                 })
                .then(res => {
                    if(res.ok){
                        setShowToast({
                            show:true,
                            message:`Sikeres termékfelvitel`,
                            type:"success"})
                        return(res.json()) 
                    }
                    throw new Error('Hiba történt')            
                })
                .catch(err => {
                    setShowToast({
                        show:true,
                        message:`Hiba történt: ${err}`,
                        type:"error"})
                })
            })
        })
        
    
    setTitle("");
    setPrice("");
}

}