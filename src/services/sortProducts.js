export default function sortProducts(products, sortBy, direction, usp) {
/*     const sortBy = usp.get("sortBy");
    const direction = usp.get("direction"); */
    let sortedProducts;

    if (sortBy == null) {
        return(
            products
        )
    }
    
    if (sortBy == "price") {
        sortedProducts = direction === "asc" ?
            products.sort((a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
            :
            products.sort((a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy]))
    } else {
        sortedProducts = direction === "asc" ? 
        products.sort((a, b) => (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) ? 1 : -1)
        :
        products.sort((a, b) => (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) ? -1 : 1)
    }

    return(
        sortedProducts
    )
}