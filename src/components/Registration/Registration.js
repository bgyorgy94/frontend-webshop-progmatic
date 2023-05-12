import userService from "../../services/user-service"
import { useState,useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContext } from "../../services/toastContext";

export default function Registration () {
    const [errorMsg,setErrorMsg] = useState("");
    const [lastNameError,setLastNameError] = useState("");
    const [firstNameError,setFirstNameError] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const {showToast,setShowToast}  = useContext(ToastContext);
    const [valid,setValid] =useState(true);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email:"",
        password:"",
        firstName:"",
        lastName:""
    })
    const [users,setUsers] = useState([]);
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
                /> <span>{lastNameError}</span> <br/>

                <label htmlFor="firstName">Keresztnév: </label>
                <input 
                name="firstName" 
                type="text" 
                placeholder="Keresztnév"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                /> <span>{firstNameError}</span> <br />
                <label htmlFor="email">Email cím: </label>
                <input 
                name="email" 
                type="text" 
                placeholder="Email cím"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                /> <span>{errorMsg}</span> < br/>
                <label htmlFor="password">Jelszó: </label>
                <input 
                name="password" 
                type="password" 
                placeholder="jelszó" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                /> <span>{passwordError}</span> <br />
                <button 
                type="submit" 
                onClick={registerButton}
                >regisztráció</button>
            </form>
        </div>
    )

    function registerButton (e){
        setValid(true)
        setLastNameError("")
        setFirstNameError("")
        setPasswordError("")
        e.preventDefault();

        if(formData.lastName ==""){
             setLastNameError("A név nem lehet üres")
             setValid(false)
        }
        if(formData.firstName ==""){
             setFirstNameError("A név nem lehet üres")
             setValid(false)
        }
        if(formData.password ==""){
             setPasswordError("A jelszó nem lehet üres")
             setValid(false)
        }else if( formData.password.length<4){
            setPasswordError("A jelszónak legalább 4 karakternek kell lennie")
            setValid(false)
        }
        console.log(valid);
        if(valid){
            userService.registration(formData.email, formData.password)
            .then(registerResp => {
               if(registerResp.error) {
                   console.log(registerResp)
                   setErrorMsg("Már létezik regisztráció ezzel az email címmel")
               }
               if(!registerResp.error) {
                   userService.createUser(registerResp.localId,formData)
                   .then(resp => { 
                       setShowToast({
                           show:true,
                           message:`Sikeres regisztráció!`,
                           type:"success"
                       })
                       console.log(resp);
                       navigate("/belepes");
                   })
               }
           
            })

        }
         }
            

}
