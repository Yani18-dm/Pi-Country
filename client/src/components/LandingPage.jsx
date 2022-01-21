import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css'

 export default function LandingPage(){
     return(
            <div className="lPage">
                <h1>Bienvenidos a mi página</h1>
                <Link to='/home'>
                    <button>Ingresar</button>
                </Link>
            </div>
     )
 }
