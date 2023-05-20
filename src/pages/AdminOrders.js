import AdminOrdersTable from "../components/AdminOrders/AdminOrdersTable"
import ProductNameSorter from "../components/ProductNameSorter/ProductNameSorter"

export default function AdminOrders() {

    return(
        <div> Megrendelések
             
            <AdminOrdersTable >
                    <ProductNameSorter name="Rendezés Vásárló neve szerint"/>
            </ AdminOrdersTable >
                         
        </div>
    )
}