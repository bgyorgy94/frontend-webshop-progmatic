import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ProductNameSorter() {
    const [searchParam, setSearchParam] = useSearchParams();
    const [state, setState] = useState(2);
    const icons = ['§', "?", ""];
    const directionToSet = ["asc", "desc", ""];
    const sortBy = searchParam.get("sortBy");
    const direction = searchParam.get("direction");


    return (
        <>
            <span onClick={setFilter}>Termék neve {icons[state]}</span>
        </>
    )

    function setFilter() {
        let currentState = state
        if (sortBy !== "name") {
            setState(0);
            currentState = 0;
        } else {
            setState( () => state + 1)
            currentState = currentState + 1;
        }

        if (currentState === 2) {
            searchParam.delete("sortBy");
            searchParam.delete("direction");
            setSearchParam(searchParam);
        } else {
            searchParam.delete("sortBy");
            searchParam.delete("direction");
            searchParam.append("sortBy", "name");
            searchParam.append("direction", directionToSet[currentState]);
            setSearchParam(searchParam)
        }
    }

}