import AdminOrdersTable from "../components/AdminOrders/AdminOrdersTable"
import ProductNameSorter from "../components/ProductNameSorter/ProductNameSorter"

export default function AdminOrders() {

    return(
        <div> Megrendelések
             
            <AdminOrdersTable >
                    <ProductNameSorter name="Rendezés Vásárló neve szerint"/>
            </ AdminOrdersTable >
                         
            <table>
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
                        <th>Mennyiség</th>
                        <th>Megrendelés összege</th>
                    </tr>
                </thead>
                <tbody>
                    <AdminOrdersTable />
                </tbody>
            </table>
        </div>
    )
}