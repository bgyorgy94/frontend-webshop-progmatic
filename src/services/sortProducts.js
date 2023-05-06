export default function sortProducts(products, sortBy, direction) {
    let sortedProducts;

    if (sortBy == null) {
        return(
            products
        )
    }
    
    if (sortBy == "price") {
        sortedProducts = direction === "asc" ?
            products.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1)
            :
            products.sort((a, b) => (a[sortBy] > b[sortBy]) ? -1 : 1)
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