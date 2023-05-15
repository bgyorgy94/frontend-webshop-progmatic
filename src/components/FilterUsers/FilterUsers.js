import { useState } from "react"
import { useSearchParams } from "react-router-dom";

const initFilter = {
    title: "",
    minimumPrice: "",
    maximumPrice: ""
};

export default function Filter() {

    const [usp, setUsp] = useSearchParams();
    const [filter, setFilter] = useState(initFilter);

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

    return (
        <form onSubmit={search}>
            <input type="text" name="title" placeholder="Keresés név alapján" value={filter.title} onChange={handleChange}/>
            <button type="submit">Szűrés</button>
            <button onClick={reset}>Reset</button>
        </form>
    )
}