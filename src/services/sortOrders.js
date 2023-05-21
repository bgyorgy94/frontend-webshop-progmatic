export default function sortOrders(orders, sortBy, direction) {
    let sortedOrders;

    if (sortBy == null) {
        return(
            orders
        )
    }
    
    if (sortBy === "date")  {
        sortedOrders = direction === "asc" ?
            orders.sort((a, b) => Number(a["timestamp"]) - Number(b["timestamp"]))
            :
            orders.sort((a, b) => Number(b["timestamp"]) - Number(a["timestamp"]))
    } else if (sortBy === "id") {
        sortedOrders = direction === "asc" ? 
        orders.sort((a, b) => (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) ? 1 : -1)
        :
        orders.sort((a, b) => (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) ? -1 : 1)
    } else {
        sortedOrders = orders
    }
    return(
        sortedOrders
    )
}