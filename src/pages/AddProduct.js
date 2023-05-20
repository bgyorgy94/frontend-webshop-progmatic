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
        <>
        <div>Új termék hozzáadása:</div>
        <form onSubmit={handlerSubmit}>
            <p>
                Termék neve:
                <input type="text" onChange={handleTitleChange} value={title} />
            </p>
            <p>
                Termék ára:
                <input type="number" onChange={handlePriceChange} value={price} />
            </p>
            <p>
                Termék képe: 
                <input type="file" name="image" onChange={fileChange} />
            </p>
            <p>
                Termék kategóriája:
                <select onChange={handleCategoryChange}>
                    {categoryList.map((category, idx) => {
                        return (<option key={idx} value={category.id}>{category.name}</option>)
                    })}
                </select>
            </p>
            <p>
                <button>Termék hozzáadása</button>
            </p>
        </form>
        </>
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
                setUploadedUrl(url);
            })
        })
        
        
        productsService.createProduct({
            name: title,
            price: price,
            url: uploadedUrl,
            categoryId: category
        }).then(json => {
            setShowToast({
                show:true,
                message:`Sikeres termékfelvitel!`,
                type:"success"
            })
            
        })
    
    
    setTitle("");
    setPrice("");
}

}