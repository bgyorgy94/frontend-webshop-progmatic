import { useEffect, useState } from "react"
import { useLocation, useSearchParams } from "react-router-dom";
import categoryService from "../../services/category-service";

const initFilter = {
    title: "",
    minimumPrice: "",
    maximumPrice: "",
    category: ""
};

export default function Filter() {

    const [usp, setUsp] = useSearchParams();
    const [filter, setFilter] = useState(initFilter);
    const [categoryList, setCategoryList] = useState([]);
    const location = useLocation();

    useEffect(() => {
        categoryService.getAllCategories()
        .then(json => setCategoryList(Object.values(json)))
    })

    const handleChange = (e) => {
            setFilter((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }))
    };

    const search = (e) => {
        e.preventDefault();
        let o = Object.fromEntries(Object.entries(filter).filter(([_, v]) => v != ""));
        setUsp(o);
    };

    const reset = () => {
        setFilter(initFilter);
        let o = Object.fromEntries(Object.entries(filter).filter(([_, v]) => v != ""));
        setUsp(o);
    }

    if (location.pathname === "/termekek" || location.pathname == "/admin/termekek") {
        return (
            <form onSubmit={search}>
                <input type="text" name="title" placeholder="Keresés név alapján" value={filter.title} onChange={handleChange}/>
                <label>
                    Minimum ár:
                    <input type="number" name="minimumPrice" min={0} value={filter.minimumPrice} onChange={handleChange}/>
                </label>
                <label>
                    Maximum ár:
                    <input type="number" name="maximumPrice" value={filter.maximumPrice} onChange={handleChange}/>
                </label>
                <label>
                    Kategória:
                    <select name="category" value={filter.category} onChange={handleChange}>
                        <option key={-1} value={""}>---</option>
                        <option key={0} value={"uncategorized"}>besorolatlan</option>
                        {categoryList.map((category, idx) => {
                            return (
                                <option key={idx+1} value={category.id}>{category.name}</option>
                            )
                        })}
                    </select>
                </label>
                <button className="btn btn-secondary m-1" type="submit">Szűrés</button>
                <button className="btn btn-secondary m-1" onClick={reset}>Reset</button>
            </form>
        )
    }
    
    if (location.pathname === "/admin/vasarlok" || location.pathname === "/admin/megrendelesek") {
        return (
            <form onSubmit={search}>
                <input type="text" name="title" placeholder="Keresés név alapján" value={filter.title} onChange={handleChange}/>
                <button type="submit" className="btn btn-secondary m-1">Szűrés</button>
                <button onClick={reset} className="btn btn-secondary m-1">Reset</button>
            </form>
        )
    }
}