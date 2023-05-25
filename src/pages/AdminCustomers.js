import AdminCustomersTable from "../components/AdminCustomersTable/AdminCustomersTable"
import Filter from "../components/Filter/Filter";
import ProductNameSorter from "../components/ProductNameSorter/ProductNameSorter";

export default function AdminCustomers() {
    return (
        <div>Vásárlók
            <Filter type="title"/>
            <AdminCustomersTable>
                <ProductNameSorter name="Rendezés név szerint"/>
            </AdminCustomersTable>
        </div>
    )
}