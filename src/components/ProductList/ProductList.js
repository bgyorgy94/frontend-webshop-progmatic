import { useNavigate, useSearchParams } from "react-router-dom";
import productsService from "../../services/products-service";
import { useContext, useEffect, useState } from "react";
import sortProducts from "../../services/sortProducts";
import { CartContext } from "../../contexts/cartContext";
import Pager from "../Pager/Pager";
import pagerService from "../../services/pager-service";
import { UserContext } from "../../contexts/userContext";
import { ToastContext } from "../../services/toastContext";
import "./ProductList.css"
import numberGrouper from "../../services/numberGrouper";
export default function ProductList() {

    const [products, setProducts] = useState([]);
    const [usp] = useSearchParams();
    const pagerData = pagerService(usp)
    const navigate = useNavigate();
  
    const [user] = useContext(UserContext);
    const { addToCart } = useContext(CartContext)
    let currentPage = Number(usp.get("page"))
    if (!currentPage) currentPage = 1;
    const endIdx = currentPage * 9;
    const startIdx = endIdx - 9;

    const {showToast,setShowToast}  = useContext(ToastContext);

    useEffect(() => {
        productsService.getAllProducts()
            .then(json => {
                const originalProducts = (Object.values(json))
                const title = usp.get("title") !== null ? (usp.get("title").toLowerCase()) : null;
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
    }
        , [usp])

    return (
        <>
                <div className="row align-items-start">
                {products.slice(pagerData.startIdx, pagerData.endIdx).map((product, idx) => {
                    return (
                        <div key={idx} className="col-md-4">
                            <div className="card my-2">
                            <img className="card-img-top" src={product.url ? product.url : ""} />
                            <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <h6 className="cart-subtitle"> Ár: {numberGrouper(product.price)} Ft</h6>
                                <button type="button" className="btn btn-primary" onClick={() => {
                                    user? addToCart(product.id) : navigate("/belepes")
                                    setShowToast({
                                        show:true,
                                        message:`A termék a kosárba került`,
                                        type:"success"})
                                    }}>
                                    Kosárba
                                </button>
                            </div>
                            </div>
                        </div>
                    )
                })}
                </div>
            <Pager allProducts={products.length} itemsPerPage={pagerData.itemsPerPage}/>
        </>
    )
}