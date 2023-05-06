import { useState } from "react"
import { useSearchParams } from "react-router-dom";

export default function Filter() {

    const [usp, setUsp] = useSearchParams();
    const [filter, setFilter] = useState({});

    const handleChange = (e) => {
            setFilter((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }))
    };

    const search = (e) => {
        e.preventDefault();
        setUsp(filter);
    };

    const reset = () => {
        setFilter({});
        setUsp(filter);
    }

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
            <button type="submit">Szűrés</button>
            <button onClick={reset}>Reset</button>
        </form>
    )
}