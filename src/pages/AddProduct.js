import { useState, useContext } from "react";
import productsService from "../services/products-service";
import { ToastContext } from "../services/toastContext"


export default function AddProduct() {
    const {showToast,setShowToast}  = useContext(ToastContext);
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")

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

    function handlerSubmit(e) {
        e.preventDefault()
        console.log(title, price)
        productsService.createProduct({
            name: title,
            price: price
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