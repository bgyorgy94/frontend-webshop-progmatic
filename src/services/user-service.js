const API_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
const API_KEY="AIzaSyB1ufXIFOcvfaHtj0f-y1OLUHqGu9C_l4M";
const API_URL_DATABASE = "https://csapat-10-default-rtdb.europe-west1.firebasedatabase.app/users"

function registration(email,password){
    return( fetch(`${API_URL+API_KEY}`,
        {
            method:"POST",
            headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
    }
    ).then(resp =>resp.json())
    )}

    function createUser(userID,userData){
        return(fetch(`${API_URL_DATABASE}/${userID}.json`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(resp => resp.json())
        )}

    function signIn(email, password) {
    
        return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })
        .then(resp => resp.json())
    }

    function getSignedInUserData(email) {
        return fetch(`${API_URL_DATABASE}.json`)
        .then(resp => resp.json())
        .then(userData => {
            let userArray = Array.from(Object.values(userData))
            let foundUser = userArray.find(element => element.email === email)
            return foundUser
        })
    }
    function getUserDatas(){    
        return(
                fetch(`${API_URL_DATABASE}.json`)
                .then(res => {
                    if(res.ok){
                        return res.json()
                    }
                    throw new Error('Hiba történt')
                })
        )
    }
    function getUserByID(id){
        return(
            fetch(`${API_URL_DATABASE}/${id}.json`)
            .then(res => {
                if(res.ok){
                    return res.json()
                }
                throw new Error('Hiba történt')
            })
        )
    }

    export default{
        registration: registration,
        createUser: createUser,
        signIn: signIn,
        getSignedInUserData: getSignedInUserData,
        getUserDatas:getUserDatas,
        getUserByID: getUserByID
    }