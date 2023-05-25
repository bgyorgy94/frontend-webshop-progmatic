import { useState } from "react";
import categoryService from "../services/category-service";

export default function AddCategory() {

    const [categoryName, setCategoryName] = useState("");

    return (
        <div className="container mt-3 col-lg-6 col-md-8 col-sm-10">
            <div className="row  text-center">
                <h2>Kategória létrehozása</h2>
            </div>
            <form onSubmit={submitHandler}>
                <div className="form-floating mt-2">
                    <input type="text" onChange={handleCategoryChange} value={categoryName} name="floatingName" className="form-control " placeholder="Kategória neve" id="floatingName"/>
                    <label for="folatingName">Kategória neve</label>
                </div>
                <div className=" d-flex align-items-center justify-content-center">
                    <button type="submit" className="btn btn-outline-secondary m-1" >Kategória létrehozása</button>
                </div>
            </form>
        </div>
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