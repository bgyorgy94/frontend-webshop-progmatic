import FilterUsers from "../components/FilterUsers/FilterUsers"
import AdminCustomersTable from "../components/AdminCustomersTable/AdminCustomersTable"
import ProductNameSorter from "../components/ProductNameSorter/ProductNameSorter";

export default function AdminCustomers() {
    return (
        <div>Vásárlók
            <FilterUsers />
            <AdminCustomersTable>
                <ProductNameSorter name="Rendezés név szerint"/>
            </AdminCustomersTable>
        </div>
    )
}