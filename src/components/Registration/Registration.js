import userService from "../../services/user-service"
import { useState } from "react"
export default function Registration () {

    const [formData, setFormData] = useState({
        email:"",
        password:"",
        firstName:"",
        lastName:""
    })
    return(
        <div>
            <h1>Regisztráció</h1>
            <form>
                <label htmlFor="lastName">Vezetéknév: </label>
                <input 
                name="lastName" 
                type="text" 
                placeholder="Vezetéknév" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                /> <br/>
                <label htmlFor="firstName">Keresztnév: </label>
                <input 
                name="firstName" 
                type="text" 
                placeholder="Keresztnév"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                /> <br />
                <label htmlFor="email">Email cím: </label>
                <input 
                name="email" 
                type="text" 
                placeholder="Email cím"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                /> <br />
                <label htmlFor="password">Jelszó: </label>
                <input 
                name="password" 
                type="password" 
                placeholder="jelszó" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                /> <br />
                <button 
                type="submit" 
                onClick={registerButton}
                >regisztráció</button>
            </form>
        </div>
    )

    function registerButton (e){
        e.preventDefault();
        userService.registration(formData.email, formData.password)
        .then(registerResp => {
             userService.createUser(registerResp.localId,formData)
             .then(resp => console.log(resp))
         })
    }
}
