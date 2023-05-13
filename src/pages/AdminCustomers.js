import FilterUsers from "../components/FilterUsers/FilterUsers"
import AdminCustomersTable from "../components/AdminCustomersTable/AdminCustomersTable"
import ProductNameSorter from "../components/ProductNameSorter/ProductNameSorter";
export default function AdminCustomers() {
    return (
        <div>Vásárlók
            <FilterUsers />
            <table>
                <thead>
                    <tr>
                        <th>
                        <ProductNameSorter name="Rendezés név szerint"/>
                        </th>
                    </tr>
                    <tr>
                        <th>Vásárló neve</th>
                        <th>Vásárló email címe</th>
                        <th>Vásárló ID</th> 
                        <th>Admin</th>
                    </tr>
                </thead>
                <tbody>
                    <AdminCustomersTable />
                </tbody>
            </table>
        </div>
    )
}