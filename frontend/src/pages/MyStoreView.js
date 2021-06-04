import '../css/jona.css'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Header from '../components/Header'
import adminStoreActions from '../redux/actions/adminStoreActions';
import { useEffect } from 'react';


const MyStoreView = (props) => {

    const { getProductsFromStore } = props

    // console.log(props.match.params.id)

    useEffect(() => { fetchAllProducts() }, [])


    const fetchAllProducts = async () => {
        const response = await getProductsFromStore(props.match.params.id)
        console.log(response)
    }


    return (
        <>
            <Header />
            <div className="myStoreContainer">



                <span>Hola</span>
                <button>Add product</button>
                {/* <TextField id="standard-basic" label="search by title"  /> */}
                <div className="containerOfItems">



                    {/* 
                <div className="oneProduct" >
                    <button className="boton"> Boton</button>
                    <div className = "portImageCard">
                        <div className="imageBackgroundCard" style={{backgroundImage:`url(https://http2.mlstatic.com/D_Q_NP_823724-MLA41765520622_052020-V.webp)`}}/>
                    </div>
                    <div className = "infoProductCard">
                        <span style={{fontSize:20}}> $ 65.000</span>
                        <span>Smart TV Noblex DJ55X6500 LED 4K 55" 220V</span>
                    </div>
                </div>

                <div className="oneProduct" />
                <div className="oneProduct" />
                <div className="oneProduct" />
                <div className="oneProduct" />
                <div className="oneProduct" />
                <div className="oneProduct" /> */}


                </div>


            </div>
        </>
    )
}



const mapStateToProps = (state) => {
    return {
        userLogged: state.authReducer.userLogged,
    }
}

const mapDispatchToProps = {
    getProductsFromStore: adminStoreActions.getProductsFromStore,

};

export default connect(mapStateToProps, mapDispatchToProps)(MyStoreView);

