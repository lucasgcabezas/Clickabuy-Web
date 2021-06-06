import React from 'react';
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaGithub, FaPinterestP, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = (props) => {
    const { categories } = props
    const pagosArray = [
        { id: 1, imagePagos: "https://webdesing881317710.files.wordpress.com/2021/05/paypal.png" },
        { id: 2, imagePagos: "https://webdesing881317710.files.wordpress.com/2021/05/mercadopago.png" },
        { id: 3, imagePagos: "https://webdesing881317710.files.wordpress.com/2021/05/visa.png" },
        { id: 4, imagePagos: "https://webdesing881317710.files.wordpress.com/2021/05/americanexpress.png" },
        { id: 5, imagePagos: "https://webdesing881317710.files.wordpress.com/2021/05/mastercard.png" }
    ]
    return (
        <footer className='contenedorFooter'>
            <div className="contenedorOptions">
                <div className="footerOptions1">
                    <p>CATEGORIES</p>
                    <div className="contenedorCategoriesFooter">
                        {
                            categories.map(category => {
                                return (
                                    <Link to={`/category/${category._id}`} className="navegadoresFooter"><span>{category.nameCategory}</span></Link>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="footerOptions2">
                    <div className="contenedorLinks">
                        <p>NAVIGATION</p>
                        <Link exact to="/" className="navegadoresFooter">Home</Link>
                        <Link to="/buys" className="navegadoresFooter">My Cart</Link>
                        <Link to="/SignUp" className="navegadoresFooter">Account</Link>
                    </div>
                </div>
            </div>
            <div className="contenedorMediosDePago">
                {/* <div> */}
                <div style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/door-to-door-delivery-2937689-2426383.png')" }} className="imageShipping"></div>
                <p>We have our very own fleet of delivery vans. Your order will be packed with care and delivered right to your door by our friendly ClickaBuy team.</p>
                {/* </div> */}
                <div>
                    {
                        pagosArray.map(elemento => {
                            return <div key={elemento._id} style={{ backgroundImage: `url('${elemento.imagePagos}')` }} className="imagePagos"></div>
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
        </footer>
    )
}
const mapStateToProps = state => {
    return {
        categories: state.categoryReducer.categories
    }
}
export default connect(mapStateToProps)(Footer)