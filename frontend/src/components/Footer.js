import React from 'react';
import { NavLink } from "react-router-dom";

export default class Footer extends React.Component{
    render(){
        return(            
            <footer className='contenedorFooter'>
                <div className="contenedorOptions">
                    <div className="footerOptions">
                        <p>HELP AND SUPPORT</p>
                    </div>
                    <div className="footerOptions"><p>CUSTOMER SERVICE</p></div>
                    <div className="footerOptions"><p>CORPORATION</p></div>
                    <div className="footerOptions"><p>WHY CHOOSE US</p></div>
                </div>
                <div className='menuRedes'>
                    {/* <nav className="menuFooter">
                        <h2>Home</h2>
                        <h2>Cities</h2>
                    </nav>             
                    <div className="redesSociales">
                        <img src="../assets/email.png" alt="E-mail" />
                        <img src="../assets/facebook.png" alt="Facebook" />
                        <img src="../assets/instagram.png" alt="Instagram" />
                    </div>    
                    </div>
                    {/* <p>All Rights Reserved - NCHN</p> */}
                    <div className='playStores'>
                        <p>Download app</p>
                        <div className="googleStore" style={{ backgroundImage: `url(../assets/images/google-play.jpg)` }}></div>
                        <div className="appleStore" style={{ backgroundImage: `url(../assets/images/app-store.jpg)` }}></div>
                    </div>
                </div>    
            </footer>     
        )
    }
}    