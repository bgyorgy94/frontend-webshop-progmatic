import AdminOrdersTable from "../components/AdminOrders/AdminOrdersTable"
import Filter from "../components/Filter/Filter"
import Pager from "../components/Pager/Pager";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import pagerService from "../services/pager-service";
import orderService from "../services/order-service";
import userService from "../services/user-service";
import Container from "react-bootstrap/Container";

export default function AdminOrders() {
  const [orderDatas, setOrderDatas] = useState([]);
  const [usp] = useSearchParams();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const { startIdx, endIdx, itemsPerPage } = pagerService(usp);
  const name = usp.get("title")
  const sortBy = usp.get("sortBy")
  const direction = usp.get("direction")

  useEffect(() => {
    orderService.getOrders()
      .then(respOrders => {
        userService.getUserDatas()
          .then(userObj => {
            const orders = Object.values(respOrders);
            setOrderDatas(
              orders.map((order) => ({
                ...order,
                fullName: `${userObj[order.uid].lastName} ${userObj[order.uid].firstName}`
              }))
            );
          });
      });
  }, [])

  useEffect(() => {
    if (name) {
      setFilteredOrders(orderDatas.filter((order) => order.fullName.toLowerCase().includes(name.toLowerCase())));
    } else {
      setFilteredOrders(orderDatas);
    }
  }, [name, orderDatas]);

  useEffect(() => {
    if (sortBy === 'name') {
      if (direction === 'asc') setFilteredOrders([...filteredOrders].sort((a, b) => a.fullName.localeCompare(b.fullName)));
      if (direction === 'desc') setFilteredOrders([...filteredOrders].sort((a, b) => b.fullName.localeCompare(a.fullName)));
    }
  }, [direction, sortBy, filteredOrders])

  return (
    <Container>
      Megrendelések
      <Filter type="title"/>
      <AdminOrdersTable orders={filteredOrders.slice(startIdx, endIdx)}/>
      <Pager
        allProducts={filteredOrders.length}
        itemsPerPage={itemsPerPage}
      />
    </Container>
  )
}
