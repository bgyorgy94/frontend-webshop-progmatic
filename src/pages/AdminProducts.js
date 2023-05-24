import AdminProductTable from "../components/AdminProductTable/AdminProductTable";
import Filter from "../components/Filter/Filter";
import ProductNameSorter from "../components/ProductNameSorter/ProductNameSorter";
import ProductPriceSorter from "../components/ProductPriceSorter/ProductPriceSorter";

export default function AdminProducts() {
    return (
        <div className="container">Admin Products
            <Filter />
            <AdminProductTable >
                <th>
                    <ProductNameSorter name="Termék neve" />
                </th>
                <th className="text-end">
                    <ProductPriceSorter />
                </th>
                <th />
            </AdminProductTable >
        </div>
    )
}