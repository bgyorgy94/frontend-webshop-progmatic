import { useState } from "react"
import { useSearchParams } from "react-router-dom";

export default function FilterByTitle() {

    const [usp, setUsp] = useSearchParams();
    const [filter, setFilter] = useState();

    const handleChange = (e) => {
        setFilter({[e.target.name]: e.target.value})
    };

    const search = (e) => {
        e.preventDefault();
        setUsp(filter);
    };

    return (
        <form onSubmit={search}>
            <input type="text" name="title" placeholder="Keresés név alapján" onChange={handleChange}/>
            <button type="submit">Szűrés</button>
        </form>
    )
}