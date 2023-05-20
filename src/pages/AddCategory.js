import { useState } from "react";
import categoryService from "../services/category-service";

export default function AddCategory() {

    const [categoryName, setCategoryName] = useState("");

    return (
        <>
        <div>Új kategória hozzáadása:</div>
        <form onSubmit={submitHandler}>
            <p>
                Kategória neve:
                <input type="text" onChange={handleCategoryChange} value={categoryName}/>
            </p>
            <p>
                <button type="submit">Kategória létrehozása</button>
            </p>
        </form>
        </>
    )

    function handleCategoryChange(e) {
        setCategoryName(e.target.value)
    }

    function submitHandler(e) {
        e.preventDefault()
        categoryService.createCategory({
            name: categoryName
        })

        setCategoryName("")
    }
}