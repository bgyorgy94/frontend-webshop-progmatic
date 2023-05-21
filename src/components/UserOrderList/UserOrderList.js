import orderService from "../../services/order-service";
import userService from "../../services/user-service";
import productsService from "../../services/products-service";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pager from "../Pager/Pager";
import pagerService from "../../services/pager-service";
import DateSorter from "../DateSorter/DateSorter";
import IdSorter from "../IdSorter/IdSorter";
import sortOrders from "../../services/sortOrders";

export default function UserOrderList(props) {

    const [orderDatas, setOrderDatas] = useState([]);
    const [userDatas, setUserDatas] = useState([]);
    const [productDatas, setProductDatas] = useState([]);
    const [usp] = useSearchParams();
    const pagerData = pagerService(usp);

    useEffect(() => {
        orderService.getOrders()
            .then(json => {
                const allOrders = Object.values(json);
                const sortBy = usp.get("sortBy");
                const direction = usp.get("direction");
                if(!sortBy) setOrderDatas(allOrders)
                else setOrderDatas(sortOrders(allOrders, sortBy, direction))

    
            

        // userService.getUserDatas()
        //     .then(json => setUserDatas(Object.values(json)))

        // productsService.getAllProducts()
        //     .then(json => setProductDatas(Object.values(json)))
        })
    }, [usp])

    const ordersDisplay = orderDatas.filter(orderData => orderData.uid === props.user.id);
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th> <IdSorter title={"Rendelésszám"} /> </th>
                        <th>Termékek</th>
                        <th>Mennyiség</th>
                        <th> <DateSorter title={"Dátum"}/> </th>
                    </tr>
                </thead>
                <tbody>
                    {ordersDisplay.slice(pagerData.startIdx, pagerData.endIdx).map((order, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{order.id}</td>
                                <td>
                                    <ul>
                                        {Object.values(order.termekek).map((prod, idx) => {
                                            return (
                                                <li key={idx}>
                                                    {prod.name}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        {Object.values(order.termekek).map((prod, idx) => {
                                            return (
                                                <li key={idx}>
                                                    {prod.quantity}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </td>
                                <td>
                                    {Intl.DateTimeFormat('HU', { dateStyle: 'long', timeStyle: 'medium', }).format(order.timestamp)}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Pager allProducts={ordersDisplay.length} itemsPerPage={pagerData.itemsPerPage} />
        </>
    )
}