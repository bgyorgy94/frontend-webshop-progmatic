import { useEffect, useState } from "react"
import orderService from "../../services/order-service";
import userService from "../../services/user-service";
import productsService from "../../services/products-service";
import sortProducts from "../../services/sortProducts";
import { useSearchParams } from "react-router-dom";
import Pager from "../Pager/Pager";
import pagerService from "../../services/pager-service";
import Table from 'react-bootstrap/Table';
import "../UserOrderList/userOrderList.css"

export default function AdminOrdersTable({children}) {

    const [orderDatas,setOrderDatas] = useState([]);
    const [userDatas,setUserDatas] = useState([]);
    const [usp] = useSearchParams();
    const pagerData = pagerService(usp);
    const name = usp.get("title")
    const [sortedOrders,setSortedOrders] = useState([]);

    let sum=0;
    useEffect( () => {
        orderService.getOrders()
        .then(json=> {
            setOrderDatas(Object.values(json))
        })

        userService.getUserDatas()
        .then(json => {
            let originalUserDatas = Object.values(json)
            let namesFiltered

            if (name !== null) {
                namesFiltered = originalUserDatas.filter((user) => (
                    user.firstName.toLowerCase().includes(name) || user.lastName.toLowerCase().includes(name)
                ))
            } else namesFiltered = originalUserDatas

            setUserDatas(namesFiltered)
            
            const direction = usp.get("direction");
        orderService.getOrders()
        .then(json => {
            direction == null ? 
            setSortedOrders(Object.values(json)) 
            : 
            setSortedOrders( direction === "asc" ? 
            orderDatas.sort((a, b) => (userDatas.filter(user=> user.id == a.uid)[0].lastName> userDatas.filter(user=> user.id == b.uid)[0].lastName) ? 1 : -1)
            :
            orderDatas.sort((a, b) => (userDatas.filter(user=> user.id == a.uid)[0].lastName> userDatas.filter(user=> user.id == b.uid)[0].lastName) ? -1 : 1)
            )  
        })
        })
    },[usp])
    console.log(usp.get("direction"))
    

    
    return(
        <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Vásárló neve</th>
                    <th>Megrendelés ID</th>
                    <th>Termékek</th>
                    <th>Ár</th>
                    <th>Mennyiség</th>
                    <th>Megrendelés összege</th>
                </tr>
            </thead>
            <tbody>
            {sortedOrders.filter((order) => (
                userDatas.map((user) => {return user.id}).includes(order.uid)
            )).slice(pagerData.startIdx, pagerData.endIdx).map( (order,idx) => {
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
                </tbody>
        </Table>
                <div>
                    <Pager allProducts={orderDatas.filter((order) => (
                                            userDatas.map((user) => {return user.id}).includes(order.uid))).length}
                    itemsPerPage={pagerData.itemsPerPage} />
                </div>
        </>
    )
}