import orderService from "../../services/order-service";
import userService from "../../services/user-service";
import productsService from "../../services/products-service";
import { useEffect, useState } from "react";

export default function UserOrderList(props) {

    const [orderDatas, setOrderDatas] = useState([]);
    const [userDatas, setUserDatas] = useState([]);
    const [productDatas, setProductDatas] = useState([]);

    useEffect(() => {
        orderService.getOrders()
        .then(json=> setOrderDatas(Object.values(json)))

        userService.getUserDatas()
        .then(json => setUserDatas(Object.values(json)))

        productsService.getAllProducts()
        .then(json=> setProductDatas(Object.values(json)))
    }, [])

    return (
        <>
            {orderDatas.map((order, idx) => {
                if (order.uid === props.user.id) {
                    return (
                        <table>
                            <thead>
                                <tr>
                                    <th>Rendelésszám</th>
                                    <th>Termékek</th>
                                    <th>Mennyiség</th>
                                </tr>
                            </thead>
                            <tr key={idx}>
                                <td>{order.id}</td>
                                <td>{Object.entries(order.termekek).map((prod, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>
                                                {productDatas.filter(prodData => prodData.id === prod[0]).map(filtered => filtered.name)}
                                            </td>
                                        </tr>
                                    )
                                })}
                                </td>
                                <td>
                                    {Object.entries(order.termekek).map((prod, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <td>{prod[1]}</td>
                                            </tr>
                                        )
                                    })}
                                </td>
                            </tr>
                        </table>
                    )
                }
            })}
        </>
    )
}