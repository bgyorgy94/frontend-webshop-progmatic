import { useEffect, useState } from "react";
import userService from "../../services/user-service"
import sortProducts from "../../services/sortProducts";
import { useSearchParams } from "react-router-dom";

export default function AdminCustomersTable() {
    const [displayUsers,setDisplayUsers] = useState([])
    const [usp] = useSearchParams();
    const [filter,setFilter] = useState("");
    
    useEffect( () => {
        
        userService.getUserDatas()
        .then(json => {
            const direction = usp.get("direction");
            usp.get("title") !==null ?
            setFilter(usp.get("title").toLowerCase())
            :
            setFilter(null)
            
            if(direction !== null) {
                setDisplayUsers(sortProducts(Object.values(json),"firstName",direction));
            }else{
                setDisplayUsers(Object.values(json))
            }
                    
                })
    },[usp])
    
    return(
        <>
         {filter ===null ?
             displayUsers.map((user,idx) => {
                return( 
                    <tr key={idx}>
                        <td>{user.lastName + " " + user.firstName}</td>
                        <td>{user.email}</td>
                        <td>{user.id}</td>
                        <td>{user.isAdmin? "Igen" : "Nem"}</td>
                    </tr>
                    )
                })
         :
             displayUsers.filter(user => user.firstName.toLowerCase().includes(filter) || user.lastName.toLowerCase().includes(filter))
             .map((filtered,idx) => {
                 return(
                     <tr key={idx}>
                         <td>{filtered.lastName + " " + filtered.firstName}</td>
                         <td>{filtered.email}</td>
                         <td>{filtered.id}</td>
                         <td>{filtered.isAdmin? "Igen" : "Nem"}</td>
                     </tr>
                 )
             })
         }
        
        
        </>
    )
}