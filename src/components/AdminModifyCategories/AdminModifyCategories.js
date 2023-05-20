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
        <form>
            <h2>Kategória módosítása</h2>
            <p>Kategória eredeti neve: {originalName}</p>
            <input value={categoryName} 
            type="text"
            onChange={(e) => setCategoryName(e.target.value)} />
            <button onClick={modifyProduct}>Módosítás</button>
        </form>
    )

    function modifyProduct(e) {
        e.preventDefault();
        categoryService.updateCategory(id, categoryName)
        .then(json => navigate("/admin/kategoriak"))
    }
}