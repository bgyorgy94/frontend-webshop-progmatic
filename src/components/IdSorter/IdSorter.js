import { useSearchParams } from "react-router-dom";
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa'


export default function IdSorter({title}) {
    const [searchParam, setSearchParam] = useSearchParams();
    const sortBy = searchParam.get("sortBy");
    let direction = "";
        
    if (sortBy === "id") {
        direction = searchParam.get("direction");
    }

    const icons = {
        asc: <FaSortUp />,
        desc: <FaSortDown />,
        none: <FaSort />
    }

    return (
        <>
          <span onClick={handleClick}> {title} {(direction && icons[direction]) || icons["none"]}</span>
        </>
    )

    function handleClick() {
        if (searchParam.get("sortBy") !== "id") {
            searchParam.set("sortBy", "id");
            searchParam.set("direction", "asc")
            
        } else if (searchParam.get("direction") === "asc") {
            searchParam.set("direction", "desc")
            
        } else if (searchParam.get("direction") === "desc") {
            searchParam.delete("sortBy");
            searchParam.delete("direction");
            
        } else {
            searchParam.set("direction", "asc")
        }
        
        setSearchParam(searchParam)
    }

}