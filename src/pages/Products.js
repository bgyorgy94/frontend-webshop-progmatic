import DropDownSorter from "../components/DropDownSorter/DropDownSorter"
import Filter from "../components/Filter/Filter"
import ProductList from "../components/ProductList/ProductList"
import ProductNameSorter from "../components/ProductNameSorter/ProductNameSorter"
import ProductPriceSorter from "../components/ProductPriceSorter/ProductPriceSorter"

export default function Products() {
    return (
        <div className="container bg-light bg-gradient p-3" style={{marginTop: "-1rem"}} >
            <h2 className="text-align-center">Termékek</h2>
            <div className="row align-items-start">
                <div className="col-md-2">
                    <div className="my-2">
                        <DropDownSorter />
                    </div>
                    <div>
                        <Filter type="title price category" />
                    </div>
                </div>
                <div className="col-md-10">
                    <ProductList />
                </div>
                
            </div>
        </div>
    )
}