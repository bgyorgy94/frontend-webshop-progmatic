import AdminOrdersTable from "../components/AdminOrders/AdminOrdersTable"
import Filter from "../components/Filter/Filter"
import ProductNameSorter from "../components/ProductNameSorter/ProductNameSorter"

export default function AdminOrders() {

    return(
        <div className="container">
            <Filter />
            <ProductNameSorter name="Rendezés Vásárló neve szerint"/>
            <AdminOrdersTable />
        </div>
    )
}