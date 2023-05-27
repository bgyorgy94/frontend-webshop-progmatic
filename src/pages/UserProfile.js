import { useContext } from "react"
import { UserContext } from "../contexts/userContext"

export default function UserProfile() {

    const [user] = useContext(UserContext);

        return (
            <div className="col-6 ms-4">
                { user &&
                    <>
                        <div className="row"> 
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