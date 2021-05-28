import {NavLink} from 'react-router-dom'
const Navbar = () => {
    return (
        <div className="navbarContainer">
            <div>
                <span>Logo</span>
            </div>
            <div>
                <input type="text" className="filterNavbar">
                </input>
            </div>
            <div className="navbarLinks">
                <NavLink to="/store">Store</NavLink>
                <span>Inicio</span>
                <span>Ingresar</span>
                <span>Registrarme</span>
            </div>
        </div>
    )
}

export default Navbar