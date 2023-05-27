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
import Table from 'react-bootstrap/Table';
import "../UserOrderList/userOrderList.css"

export default function UserOrderList(props) {

    const [orderDatas, setOrderDatas] = useState([]);
    const [usp] = useSearchParams();
    const pagerData = pagerService(usp);
    const item = usp.get("item");

    useEffect(() => {
        orderService.getOrders()
            .then(json => {
                const allOrders = Object.values(json);
                const userOrders = allOrders.filter((orderData) => orderData.uid === props.user.id);
                const userOrdersWithProductNames = userOrders.map(order => ({
                    ...order,
                    productsName: `${Object.values(order.termekek).map(items => items.name)}`
                }))
                let filteredOrders;
                if(item) {
                    filteredOrders = userOrdersWithProductNames.filter((order) => order.productsName.toLowerCase().includes(item.toLowerCase()))
                } else {
                    filteredOrders = userOrders;
                }
                const sortBy = usp.get("sortBy");
                const direction = usp.get("direction");
                if(!sortBy) setOrderDatas(filteredOrders)
                else setOrderDatas(sortOrders(filteredOrders, sortBy, direction))
        })
    }, [usp])

    const ordersDisplay = orderDatas.filter(orderData => orderData.uid === props.user.id);
    return (
        <div>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th> <IdSorter title={"Rendelésszám"} /> </th>
                        <th>Termékek</th>
                        <th>Mennyiség</th>
                        <th> <DateSorter title={"Dátum"}/> </th>
                    </tr>
                </thead>
                <tbody>
                    {orderDatas.slice(pagerData.startIdx, pagerData.endIdx).map((order, idx) => {
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
            </Table>
            <Pager allProducts={orderDatas.length} itemsPerPage={pagerData.itemsPerPage} />
        </div>
    )
}