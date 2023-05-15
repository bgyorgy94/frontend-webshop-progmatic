import AdminProductTable from "../components/AdminProductTable/AdminProductTable";
import Filter from "../components/Filter/Filter";
import ProductNameSorter from "../components/ProductNameSorter/ProductNameSorter";
import ProductPriceSorter from "../components/ProductPriceSorter/ProductPriceSorter";

export default function AdminProducts() {
    return (
        <div>Admin Products
            <Filter />
            <AdminProductTable >
                <ProductNameSorter name="Termék neve"/>
		        <ProductPriceSorter />
            </AdminProductTable >
        </div>
    )
}