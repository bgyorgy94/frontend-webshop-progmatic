import DropDownSorter from "../components/DropDownSorter/DropDownSorter"
import Filter from "../components/Filter/Filter"
import ProductList from "../components/ProductList/ProductList"
import ProductNameSorter from "../components/ProductNameSorter/ProductNameSorter"
import ProductPriceSorter from "../components/ProductPriceSorter/ProductPriceSorter"

export default function Products() {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-md-2">
                    <div className="my-2">
                        <DropDownSorter />
                    </div>
                    <div>
                        <Filter />
                    </div>
                </div>
                <div className="col-md-10">
                    <ProductList />
                </div>
            </div>
        </div>
    )
}