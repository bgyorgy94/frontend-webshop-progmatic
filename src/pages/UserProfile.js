import { useContext } from "react"
import { UserContext } from "../contexts/userContext"

export default function UserProfile() {

    const [user] = useContext(UserContext);

        return (
            <div className="container col-6 bg-light bg-gradient p-3" style={{marginTop: "-1rem"}}>
                { user &&
                    <>  <h2>Profil</h2>
                        <div className="row pt-2"> 
                            <p className="text-start fw-bold" > <span className="fw-normal m-2"> Név:</span> {user.lastName+ " " +user.firstName}</p>
                        </div> 
                        <div className="row"> 
                            <p className="text-start fw-bold"> <span className="fw-normal m-2">Email cím:</span> {user.email}</p>
                        </div> 
                    </>
                }
            </div>
        )
}