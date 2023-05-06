import { useState } from "react";

export default function AddProduct() {

const [title, setTitle] = useState ("")
const [price, setPrice] = useState ("")

function handleTitleChange(e){
    let value = e.target.value;
    setTitle(value)  
}
function handlePriceChange(e){
    let value = e.target.value;
    setPrice(value)  
}

function handlerSubmit(e){
    e.preventDefault()
    console.log (title, price)
}
    return(
        <div>Add product</div>,
        <form onSubmit={handlerSubmit}> 
            <p>
                <input type = "text" onChange={handleTitleChange} value = {title}/>
            </p>
            <p>
                <input type = "number" onChange={handlePriceChange} value = {price}/>
            </p>
            <p>
                <button >Submit</button>
            </p>
        </form>
              
    )
}