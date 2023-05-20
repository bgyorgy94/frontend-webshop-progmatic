import { useEffect, useState } from "react";
import categoryService from "../../services/category-service";
import { Link } from "react-router-dom";

export default function AdminCategoryList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoryService.getAllCategories()
        .then(json => {
            setCategories(Object.values(json))
        })
    }, []);

    return (
        <>
            <h2>Kategóriák</h2>
            <table>
                {categories.map((category, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{category.name}</td>
                            <td><Link to={`/admin/kategoriak/${category.id}/modositas`}>Módosítás</Link></td>
                            <td><Link to={`/admin/kategoriak/${category.id}/torles`}>Törlés</Link></td>
                        </tr>
                    )
                })}
            </table>
        </>
    )
}