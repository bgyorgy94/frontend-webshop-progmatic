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

                if (title !== null && title !== "") {
                    return (originalProducts.filter((product) => (
                        product.name.toLowerCase().includes(title) && Number(product.price) >= Number(minimumPrice) && Number(product.price) <= Number(maximumPrice)
                    )))
                }
                else {
                    return (originalProducts.filter((product) => (
                        Number(product.price) >= Number(minimumPrice) && Number(product.price) <= Number(maximumPrice)
                    )))
                }
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
            <ul>
                {products.slice(pagerData.startIdx, pagerData.endIdx).map((product, idx) => {
                    return (
                        <li key={idx}>
                            <img src={product.url ? product.url : ""} />
                            <p> Termék neve: {product.name} </p>
                            <p> Ár: {product.price} </p>
                            <p>
                                <button onClick={() => {
                                    user? addToCart(product.id) : navigate("/belepes")
                                    setShowToast({
                                        show:true,
                                        message:`A termék a kosárba került`,
                                        type:"success"})
                                    }}>
                                    Kosárba
                                </button>
                            </p>
                        </li>
                    )
                })}

            </ul>
            <Pager allProducts={products.length} itemsPerPage={pagerData.itemsPerPage}/>
        </>
    )
}