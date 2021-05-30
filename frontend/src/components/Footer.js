import React from 'react';
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaGithub, FaPinterestP, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { Link } from 'react-router-dom';

const Footer = () => {
    const pagosArray = [
        {id: 1, imagePagos:"https://webdesing881317710.files.wordpress.com/2021/05/paypal.png"},
        {id: 2, imagePagos:"https://webdesing881317710.files.wordpress.com/2021/05/mercadopago.png"},
        {id: 3, imagePagos:"https://webdesing881317710.files.wordpress.com/2021/05/visa.png"},
        {id: 4, imagePagos:"https://webdesing881317710.files.wordpress.com/2021/05/americanexpress.png"},
        {id: 5, imagePagos:"https://webdesing881317710.files.wordpress.com/2021/05/mastercard.png"}
    ]
    return (
        <footer className='contenedorFooter'>
            <div className="contenedorOptions">
                <div className="footerOptions">
                    <p>CATEGORIES</p>
                    {/* {
                        
                    } */}
                </div>
                <div className="footerOptions">
                    <p>NAVIGATION</p>
                    <Link></Link>
                    <Link></Link>
                    <Link></Link>
                </div>
                <div className="footerOptions">
                    <p>MY ACCOUNT</p>
                </div>
            </div>
            <div className="contenedorMediosDePago">
                <div>
                    {
                        pagosArray.map(elemento => {
                            return <div style={{backgroundImage: `url('${elemento.imagePagos}')`}} className="imagePagos"></div>
                        })
                    }
                </div>
            </div>
            <div className="contenedorSocialMedia">
                <div>
                    <Link className="facebook"><FaFacebookF /></Link>
                    <Link className="twitter"><FaTwitter /></Link>
                    <Link className="google"><FaGooglePlusG /></Link>
                    <Link className="github"><FaGithub /></Link>
                    <Link className="pinterest"><FaPinterestP /></Link>
                    <Link className="linkedin"><FaLinkedin /></Link>
                    <Link className="instagram"><FaInstagram /></Link>
                    <Link className="mail"><MdEmail /></Link>
                </div>
            </div>
            <div className="copyright">
                <p>Copyright 2021 . All rights reserved</p>
            </div>
            {/* <div className='menuRedes'> */}
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
            {/* <div className='playStores'>
                        <p>Download app</p>
                        <div className="googleStore" style={{ backgroundImage: `url(../assets/images/google-play.jpg)` }}></div>
                        <div className="appleStore" style={{ backgroundImage: `url(../assets/images/app-store.jpg)` }}></div>
                    </div> */}
            {/* </div>     */}
        </footer>
    )
}
export default Footer