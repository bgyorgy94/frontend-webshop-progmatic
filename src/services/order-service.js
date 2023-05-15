const API_URL_ORDERS="https://csapat-10-default-rtdb.europe-west1.firebasedatabase.app/megrendelesek"

function getOrders(){    
    return(
            fetch(`${API_URL_ORDERS}.json`)
            .then(res => {
                if(res.ok){
                    return res.json()
                }
                throw new Error('Hiba történt')
            })
    )
}

function getOrderById(id){
    return(
        fetch(`${API_URL_ORDERS}/${id}.json`)
        .then(res => {
            if(res.ok){
                return res.json()
            }
            throw new Error('Hiba történt')
        })
    )
}

export default {
    getOrders:getOrders,
    getOrderById:getOrderById
}

