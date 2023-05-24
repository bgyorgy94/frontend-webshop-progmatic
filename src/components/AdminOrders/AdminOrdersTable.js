import ProductNameSorter from "../ProductNameSorter/ProductNameSorter";
import Table from "react-bootstrap/Table";

export default function AdminOrdersTable({orders}) {
    return (
      <Table responsive striped bordered hover>
          <thead>
          <tr>
              <th>
                  <ProductNameSorter name="Rendezés Vásárló neve szerint"/>
              </th>
          </tr>
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
          {orders.map((order) => (
            <tr key={order.id}>
                <td>{order.fullName}</td>
                <td> {order.id}</td>
                <td>
                    <ul>
                        {Object.values(order.termekek).map((product) => (
                            <li key={product.id}>
                                {product.name}
                            </li>
                          )
                        )}
                    </ul>
                </td>
                <td>
                    <ul>
                        {Object.values(order.termekek).map((product) => (
                            <li key={product.id}>
                                {product.price}
                            </li>
                          )
                        )}
                    </ul>
                </td>
                <td>
                    <ul>
                        {Object.values(order.termekek).map((product) => (
                            <li key={product.id}>
                                {product.quantity}
                            </li>
                          )
                        )}
                    </ul>
                </td>
                <td>
                    {Object.values(order.termekek).reduce((sum, product) => (
                      sum + product.price * product.quantity
                    ), 0)}
                </td>
            </tr>
          ))}
          </tbody>
      </Table>
    )
}
