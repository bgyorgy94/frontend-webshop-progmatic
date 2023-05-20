import DropDownSorter from "../components/DropDownSorter/DropDownSorter"
import Filter from "../components/Filter/Filter"
import ProductList from "../components/ProductList/ProductList"
import ProductNameSorter from "../components/ProductNameSorter/ProductNameSorter"
import ProductPriceSorter from "../components/ProductPriceSorter/ProductPriceSorter"

export default function Products() {
    return(
        <>
            <Filter />
                <DropDownSorter />
            <ProductList />
        </>
    )
}