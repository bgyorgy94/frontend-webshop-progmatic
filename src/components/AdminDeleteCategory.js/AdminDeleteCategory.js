import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categoryService from "../../services/category-service";
import { ToastContext } from "../../services/toastContext";

export default function AdminDeleteCategory() {
    const [categoryName, setCategoryName] = useState();
    const {id} = useParams();
    const navigate = useNavigate();
    const { showToast, setShowToast } = useContext(ToastContext);

    useEffect(() => {
        categoryService.getCategory(id)
        .then(json => setCategoryName(json.name))
    }, [])

    return (
        <div className="container mt-3 col-lg-6 col-md-8 col-sm-10">
            <div className="row  text-center">
                <h2>Biztosan törli a kategóriát?</h2>
            </div>
            <div className="row  text-center">
                <p>{categoryName}</p>
                <div className=" d-flex align-items-center justify-content-center flex-wrap">
                    <button onClick={deleteHandler} className="btn btn-outline-secondary m-1">Törlés</button>
                    <button onClick={() => navigate("/admin/kategoriak")} className="btn btn-outline-secondary m-1">Mégsem</button>
                </div>
            </div>
        </div>
    )

    function deleteHandler() {
        categoryService.deleteCategory(id)
        .then(json => {
            setShowToast({
                show: true,
                message: `Sikeresen törölve`,
                type: "success"
            })
            navigate("/admin/kategoriak")
        })
            
    }
}