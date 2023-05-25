import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categoryService from "../../services/category-service";

export default function AdminModifyCategories() {
    const {id} = useParams();
    const [originalName, setOriginalName] = useState("");
    const [categoryName, setCategoryName] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        categoryService.getCategory(id)
        .then(json => setOriginalName(json.name))
    }, [])

    return (
        <div className="container mt-3 col-lg-6 col-md-8 col-sm-10">
            <div className="row  text-center">
                <h2>Kategória módosítása</h2>
            </div>
            <form>
                <div className="row  text-center">
                    <p>Kategória eredeti neve: {originalName}</p>
                </div>
                <div className="form-floating mt-2">
                    <input value={categoryName} 
                    type="text"
                    onChange={(e) => setCategoryName(e.target.value)}
                    name="floatingName" className="form-control " placeholder="Kategória új neve" id="floatingName"/>
                    <label for="folatingName">Kategória új neve</label>
                </div>
                <div className=" d-flex align-items-center justify-content-center">
                    <button onClick={modifyProduct} className="btn btn-outline-secondary m-1">Módosítás</button>
                </div>
            </form>
        </div>
    )

    function modifyProduct(e) {
        e.preventDefault();
        categoryService.updateCategory(id, categoryName)
        .then(json => navigate("/admin/kategoriak"))
    }
}