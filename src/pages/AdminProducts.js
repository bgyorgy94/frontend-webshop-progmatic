import AdminProductTable from "../components/AdminProductTable/AdminProductTable";
import Filter from "../components/Filter/Filter";
import ProductNameSorter from "../components/ProductNameSorter/ProductNameSorter";

export default function AdminProducts() {
    return (
        <div>Admin Products
            <Filter />
            <table>
                <thead>
                    <tr>
                        <th><ProductNameSorter /></th>
                        <th>Termék ára</th>
                    </tr>
                </thead>
                <tbody>
                    <AdminProductTable />
                </tbody>
            </table>

        </div>
    )
}