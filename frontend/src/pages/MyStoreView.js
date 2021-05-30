import  '../css/jona.css'
import TextField from '@material-ui/core/TextField';

const MyStoreView = () => {
    return (
        <div className = "body">
            <TextField id="standard-basic" label="search by title"  />
            <div className ="containerOfItems">
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
                <div className="oneProduct" />

            </div>
        </div>
    )
}


export default MyStoreView;
