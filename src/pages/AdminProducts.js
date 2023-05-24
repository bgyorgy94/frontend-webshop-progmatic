import AdminProductTable from "../components/AdminProductTable/AdminProductTable";
import Filter from "../components/Filter/Filter";

export default function AdminProducts() {
    return (
        <div className="container">Admin Products
            <Filter />
            <AdminProductTable />
        </div>
    )
}
