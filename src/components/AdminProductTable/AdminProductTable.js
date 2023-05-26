import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom";
import productsService from "../../services/products-service";
import sortProducts from "../../services/sortProducts";
import pagerService from "../../services/pager-service";
import Pager from "../Pager/Pager";
import ProductNameSorter from "../ProductNameSorter/ProductNameSorter";
import ProductPriceSorter from "../ProductPriceSorter/ProductPriceSorter";
import numberGrouper from "../../services/numberGrouper";

export default function AdminProductTable() {
  const [products, setProducts] = useState([]);
  const [usp] = useSearchParams();
  const pagerData = pagerService(usp)

  useEffect(() => {
    productsService.getAllProducts()
      .then(json => {
        const originalProducts = (Object.values(json))
        const title = usp.get("title");
        const minimumPrice = usp.get("minimumPrice") || 0;
        const maximumPrice = usp.get("maximumPrice") || Number.MAX_SAFE_INTEGER;
        const category = usp.get("category");
        let titleFiltered;
        let categoryFiltered;

        if (title !== null && title !== "") {
          titleFiltered = originalProducts.filter((product) => (
            product.name.toLowerCase().includes(title)))
        } else titleFiltered = originalProducts;

        if (category === "uncategorized") {
          categoryFiltered = titleFiltered.filter((product) => (
            product.categoryId === "" || !product.categoryId
          ))
        } else if (category !== null) {
          categoryFiltered = titleFiltered.filter((product) => (
            product.categoryId === category
          ))
        } else categoryFiltered = titleFiltered;

        return (
          categoryFiltered.filter((product) => (
            Number(product.price) >= Number(minimumPrice) && Number(product.price) <= Number(maximumPrice)
          ))
        )
      })
      .then(json => {
        const sortBy = usp.get("sortBy");
        const direction = usp.get("direction");
        setProducts(sortProducts(json, sortBy, direction))
      })
  }, [usp])

  return (
    <>
      <table className="table table-hover">
        <thead>
        <tr>
          <th className="text-nowrap">
            <ProductNameSorter name="Termék neve"/>
          </th>
          <th className="text-end text-nowrap">
            <ProductPriceSorter/>
          </th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {products.slice(pagerData.startIdx, pagerData.endIdx).map((product, idx) => {
          return (
            <tr key={idx}>
              <td className="align-middle">{product.name}</td>
              <td className="text-end w-auto align-middle">{numberGrouper(product.price)} Ft</td>
              <td className="text-end w-1">
                <div className="btn-group">
                  <Link className="btn btn-outline-primary"
                        to={`/admin/termekek/${product.id}/modositas`}>Módosítás</Link>
                  <Link className="btn btn-danger" to={`/admin/termekek/${product.id}/torles`}>Törlés</Link>
                </div>
              </td>
            </tr>)
        })}
        </tbody>
      </table>
      <Pager allProducts={products.length} itemsPerPage={pagerData.itemsPerPage}/>
    </>
  )
}
