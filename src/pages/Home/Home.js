import cover from "../../pictures/coverdogs.jpg"
import { Col } from "react-bootstrap"
import { Link } from "react-router-dom"

import HomePageCarousel from "../../components/HomePageCarousel/HomePageCarousel"
import React from "react"
import "./home.scss"


export default function Home() {
    return (


        <>
            <div className="home-page">
                <img src={cover} alt="cover dogs" className="col-md-fluid w-100 max-h-40 coverphoto home-page" style={{ objectFit: 'cover' }} max-height="500vh"  ></img>


            </div>
            <div className="container bg-light justify-content-center">
                <div className="row">

                </div>
            </div>



            <section className=" container col-md-6 my-4">

                <h2>Üdvözöljük a PupWear webáruházban!</h2>
                <p>
                    A PupWear a legcukibb ruhák és jelmezek széles választékát kínálja kutyák és macskák számára. Nálunk minden négylábú barát megtalálhatja a stílusos és kényelmes öltözékét mindennapi sétákhoz vagy különleges alkalmakra.
                </p>
                <p>
                    Központi filozófiánk az, hogy minden kisállatot beöltöztessünk úgy, hogy ők is úgy érezzék magukat, mint egy igazi divatikon. Ezért gondosan összeválogattunk egyedi tervezésű ruhákat és jelmezeket, amelyek között megtalálhatók mind a vicces, aranyos darabok, mind pedig az ünnepi alkalmakra szánt különlegességek.
                </p>
                <p>
                    Fontos számunkra, hogy a termékeink ne csak jól nézzenek ki, hanem kényelmesek és biztonságosak is legyenek. Anyagaink kiválasztásakor mindig az állatok kényelmét és védelmét tartjuk szem előtt. Nyári ruháink jól szellőznek, hogy a kutyusok és macskák ne legyenek túlmelegedve, míg téli kabátjaink melegen tartják őket a hideg napokon is. A jelmezek pedig könnyű és puha anyagokból készülnek, hogy az állatok szabadon mozoghassanak, mégis stílusosak legyenek.
                </p>
                <p>
                    Nagy hangsúlyt fektetünk a méretválasztékra is. Tudjuk, hogy minden kisállat egyedi, ezért különbséget teszünk kis- és nagytestű kutyák között. Emellett figyelembe vesszük a különböző testalkatokat is, hogy mindenki megtalálhassa a számára legmegfelelőbb ruhadarabot. Az online képek segítségével könnyen látható, hogy melyik darab milyen típusú kutyákra lett tervezve.
                </p>
                <p>
                    Jelenleg a PupWear főként ruhákat és jelmezeket kínál, azonban a jövőben tervezzük a kiegészítők és tartozékok bevezetését is. Legyen szó pórázokról, nyakörvekről vagy játékokról, célunk, hogy mindenre gondoljunk, amire a kedvencünknek szüksége lehet a divatos megjelenés mellett.
                </p>
                <p>
                    Várunk szeretettel a PupWear webáruházban, ahol a legjobb ruhák és jelmezek várnak rád, hogy kisállatodat egyedivé és elbűvölővé varázsolják!
                </p>
            </section>
            <Col md={2}></Col>

            <div className="container col-md-6 my-5" >
                <h2> Legkeresettebb termékeink </h2>
                <HomePageCarousel />
                <div style={{ textAlign: "right" }}>
                    <Link to="/termekek" className="link-opacity-25-hover" > ugrás az összes termékhez </Link>

                </div>
            </div>

        </>
    )
}
