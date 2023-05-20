import { useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function DropDownSorter() {
    const [searchParam, setSearchParam] = useSearchParams();
    const sortBy = searchParam.get("sortBy");
    const direction = searchParam.get("direction");
    const [dropdownValue, setDropdownValue] = useState(() => {
        if (sortBy === "price") {
            if (direction === "asc") {
                return "priceAsc"
            } else if (direction === "desc") {
                return "priceDesc"
            }
        } else if (sortBy === "name") {
            if (direction === "asc") {
                return "nameAsc"
            } else if (direction === "desc") {
                return "nameDesc"
            }
        } else {
            return "none"
        }
    }
    )

    return (
        <div>
            <label>
                Rendezés:
                <select value={dropdownValue} onChange={dropdownHandler}>
                    <option value={"none"}></option>
                    <option value={"priceAsc"}>Ár szerint növekvő</option>
                    <option value={"priceDesc"}>Ár szerint csökkenő</option>
                    <option value={"nameAsc"}>Név szerint növekvő</option>
                    <option value={"nameDesc"}>Név szerint csökkenő</option>
                </select>
            </label>
        </div>
    )
    function dropdownHandler(e) {
        let newSorting = e.target.value
        setDropdownValue(newSorting);


        if (newSorting === "priceAsc") {
            searchParam.set("sortBy", "price");
            searchParam.set("direction", "asc");

        } else if (newSorting === "priceDesc") {
            searchParam.set("sortBy", "price");
            searchParam.set("direction", "desc");

        } else if (newSorting === "nameAsc") {
            searchParam.set("sortBy", "name");
            searchParam.set("direction", "asc");

        } else if (newSorting === "nameDesc") {
            searchParam.set("sortBy", "name");
            searchParam.set("direction", "desc");
        } else {
            searchParam.delete("sortBy");
            searchParam.delete("direction");
        }

        setSearchParam(searchParam);
    }
}