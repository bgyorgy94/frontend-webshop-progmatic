import { useEffect, useState } from "react"
import orderService from "../../services/order-service";
import userService from "../../services/user-service";
import productsService from "../../services/products-service";
import sortProducts from "../../services/sortProducts";
import { useSearchParams } from "react-router-dom";
import Pager from "../Pager/Pager";
import pagerService from "../../services/pager-service";

export default function AdminOrdersTable({children}) {

    const [orderDatas,setOrderDatas] = useState([]);
    const [userDatas,setUserDatas] = useState([]);
    const [usp] = useSearchParams();
    const pagerData = pagerService(usp);
    let sum=0;
    useEffect( () => {
        orderService.getOrders()
        .then(json=> setOrderDatas(Object.values(json)))

        userService.getUserDatas()
        .then(json => setUserDatas(Object.values(json)))
        
        
    },[usp])
    
    return(
        <>
            {orderDatas.slice(pagerData.startIdx, pagerData.endIdx).map( (order,idx) => {
                sum =0;
                return(
                    <tr key={idx}>
                         <td> {
                            userDatas.filter( user => user.id == order.uid)
                            .map(user => user.lastName + " " + user.firstName)
                            }</td>  
                        <td> {order.id}</td> 
                        <td>
                            <ul>
                                {
                                Object.entries(order.termekek).map((product,idx) =>{
                                    return(
                                        <li key={idx}>{product[1].name}</li>
                                    )})}
                            </ul> 
                        </td>
                        <td>
                            <ul>
                                {Object.entries(order.termekek).map((product,idx) =>{
                                    return(
                                        <li key={idx}>{product[1].price}</li>
                                            )})}
                            </ul>
                        </td>
                        <td>
                            <ul>
                                {Object.entries(order.termekek).map((product,idx) =>{
                                    return(
                                        <li key={idx}>{product[1].quantity}</li>
                                            )})}
                            </ul>
                        </td>
                        {
                        Object.entries(order.termekek).map((product,idx) =>{
                        sum = sum+product[1].price*product[1].quantity})
                        }
                        <td>{sum}</td>
                    </tr>
                )})}
                <tr>
                    <Pager allProducts={orderDatas.length} itemsPerPage={pagerData.itemsPerPage} />
                </tr>
        </>
    )
}