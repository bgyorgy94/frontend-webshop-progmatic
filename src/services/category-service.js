
const API_URL = "https://csapat-10-default-rtdb.europe-west1.firebasedatabase.app/categories"

function createCategory(category) {
    return (
        fetch(`${API_URL}.json`, {
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify(category)
        })
        .then(res=> {
            if(res.ok){
                return res.json()
            }
            throw new Error('Hiba történt')
        })
        .then(json => {
            fetch(`${API_URL}/${json.name}.json`, {
                method: "PATCH",
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify({
                    id: `${json.name}`
                })
            })
        })
        .then(res => {
            if(res.ok) {
                return res.json()
            }
            throw new Error("Hiba történt")
        })
    )
}

export default {
    createCategory: createCategory
}