import { useParams } from "react-router-dom"

export default function DeleteProduct() {
    let {id} = useParams();
    return(
        <div>Delete product {id}</div>
    )
}