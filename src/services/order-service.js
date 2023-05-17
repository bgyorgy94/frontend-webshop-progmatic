const API_URL_ORDERS = "https://csapat-10-default-rtdb.europe-west1.firebasedatabase.app/megrendelesek"

function getOrders() {
    return (
        fetch(`${API_URL_ORDERS}.json`)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error('Hiba történt')
            })
    )
}

function getOrderById(id) {
    return (
        fetch(`${API_URL_ORDERS}/${id}.json`)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error('Hiba történt')
            })
    )
}

function sendOrder(cart, user) {
    return (
        fetch(`${API_URL_ORDERS}.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    uid: user.id,
                    termekek: cart
                }
            )
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error('Hiba történt')
            })
            .then(json => {
                fetch(`${API_URL_ORDERS}/${json.name}.json`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: json.name
                    })
                }
                )
                    .then(res => {
                        if (res.ok) {
                            return res.json()
                        }
                        throw new Error('Hiba történt')
                    })
            })
    )
}

export default {
    getOrders: getOrders,
    getOrderById: getOrderById,
    sendOrder: sendOrder
}

