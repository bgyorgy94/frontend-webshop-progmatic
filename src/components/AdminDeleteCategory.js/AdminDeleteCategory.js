import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categoryService from "../../services/category-service";

export default function AdminDeleteCategory() {
    const [categoryName, setCategoryName] = useState();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        categoryService.getCategory(id)
        .then(json => setCategoryName(json.name))
    }, [])

    return (
        <div>
            <h2>Biztosan törli a kategóriát?</h2>
            <p>{categoryName}</p>
            <button onClick={deleteHandler}>Törlés</button>
            <button onClick={() => navigate("/admin/kategoriak")}>Mégsem</button>
        </div>
    )

    function deleteHandler() {
        categoryService.deleteCategory(id)
        .then(json => navigate("/admin/kategoriak"))
    }
}