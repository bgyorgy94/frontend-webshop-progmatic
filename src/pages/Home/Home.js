import cover from "../../pictures/coverdogs.jpg"
import {Col} from "react-bootstrap"
import {Link} from "react-router-dom"

import HomePageCarousel from "../../components/HomePageCarousel/HomePageCarousel"
import React from "react"
import "./home.scss"


 



export default function Home() {
    return(
        
         
            <>
            <div className="home-page">
                <img src={cover} alt="cover dogs" className="col-md-fluid w-100 max-h-40 coverphoto home-page" style={{objectFit: 'cover'}} max-height= "500vh"  ></img>
                

            </div>
                <div className="container bg-light justify-content-center">
                    <div className="row">

                    </div>
                </div>
        

                       
                <section  className=" container col-md-6 my-4">
                        
                        <h2> Rólunk </h2>
                        <p>
                            Lorem ipsum dolor sit amet. Est expedita expedita hic dicta temporibus eum exercitationem tenetur id rerum officiis et autem odio? Et voluptas dolores in totam culpa ea adipisci excepturi 33 nesciunt similique aut internos inventore cum perspiciatis modi et incidunt laboriosam. In obcaecati quas ab quia dolorem et facilis laboriosam est illum galisum aut nemo odit.
                        </p>
                        <p>
                            Sit aperiam reprehenderit ut fugiat pariatur nam quaerat deleniti et praesentium dolor. Sed dicta dolores et numquam numquam At animi repellat eos velit pariatur. Qui provident dolorem a quis commodi ab internos repudiandae qui quae voluptatem et distinctio facilis ut unde quidem! Ut consequatur dolores ad iusto repudiandae et voluptatem iure qui praesentium laudantium ut nihil rerum At debitis consectetur. 
                        </p>
                        <p>
                            Ad adipisci voluptas eum aspernatur galisum aut aspernatur mollitia et consequatur quasi. Eum nihil exercitationem eos velit ipsam eos nostrum quia. Ut quia voluptatem in deserunt numquam aut sequi nostrum quo animi delectus est enim inventore eos facere incidunt vel odit obcaecati.
                        </p>
                </section>
                    <Col md={2}></Col>
              
         <div className= "container col-md-6 my-5" >
            <h2> Legkeresettebb termékeink </h2>
            <HomePageCarousel   />
            <div style={{textAlign: "right"}}>
                <Link to="/termekek" className="link-opacity-25-hover" > ugrás az összes termékhez </Link>

            </div>
         </div>
 
        </>
    )}
