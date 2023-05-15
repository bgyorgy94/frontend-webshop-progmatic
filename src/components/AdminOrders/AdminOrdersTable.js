import { useEffect, useState } from "react"
import orderService from "../../services/order-service";
import userService from "../../services/user-service";
import productsService from "../../services/products-service";
import sortProducts from "../../services/sortProducts";
import { useSearchParams } from "react-router-dom";
export default function AdminOrdersTable() {

    const [orderDatas,setOrderDatas] = useState([]);
    const [userDatas,setUserDatas] = useState([]);
    const [productDatas,setProductDatas] = useState([]);

    useEffect( () => {
        orderService.getOrders()
        .then(json=> setOrderDatas(Object.values(json)))

        userService.getUserDatas()
        .then(json => setUserDatas(Object.values(json)))

        productsService.getAllProducts()
        .then(json=> setProductDatas(Object.values(json)))
        
        
    },[])
    
    return(
        <>
        {orderDatas.map( (order,idx) => {
                return(
                    <tr key={idx}>
                        <td> {
                            userDatas.filter( user => user.id == order.uid)
                            .map(user => user.lastName + " " + user.firstName)
                        }</td> 
                        <td> {order.id}</td> 
                        <td> {
                            Object.entries(order.termekek).map((product,idx) =>{
                                return(
                                    <tr key={idx}>
                                        <td>
                                            {
                                            productDatas.filter( prod => prod.id == product[0])
                                            .map( filtered => filtered.name )
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </td>
                        <td>{Object.entries(order.termekek).map((product,idx) =>{
                                return(
                                    <tr key={idx}>
                                        <td>{product[1]}</td>
                                    </tr>
                                )
                            })}
                        </td>

                    </tr>
                )
            })
        }
        </>
    )
}