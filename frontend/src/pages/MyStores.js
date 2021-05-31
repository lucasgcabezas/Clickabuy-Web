import {connect} from 'react-redux'
import  '../css/jona.css'
import {Link} from 'react-router-dom'
const MyStore = (userLogged) => {
    return (
        <div className ="body">
            <span style={{textAlign:"center"}}>YOUR STORES</span> 
            <div className="containerOfItems">
                <Link to = "/myStoreView"><div className="oneStore"></div></Link>
                <div className="oneStore"></div>
                <div className="oneStore"></div>
                <div className="oneStore"></div>
                <div className="oneStore"></div>
                <div className="oneStore"></div>
                <div className="oneStore"></div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userLogged : state.authReducer.userLogged,
    }
}

export default connect(mapStateToProps)(MyStore);