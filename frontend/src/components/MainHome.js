import { Link } from "react-router-dom"

const MainHome = () => {
    return (
        <>
            <div className="contenedorPublicity">
                <div style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/new-incomes.png')" }} className="imagePublicity">
                    {/* <Link to="/category"></Link> */}
                    <button className="buttonPulicity1"><p>CHECK IT OUT!</p></button>
                </div>
                <div style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/new-incomes-1.png')" }} className="imagePublicity2">
                    {/* <Link></Link> */}
                    <button className="buttonPulicity2"><p>CHECK IT OUT!</p></button>
                </div>
            </div>
            <div className="contenedorFlashDeals">
                <h3>Flash Deals</h3>
                <div className="contenedorflashDealsInfo">

                </div>
            </div>
            <div className="contenedorDownload">
                <div>
                    <div className="downloadAppInfo">
                        <p>Upload clickabuy app</p>
                        <div style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/download.png')" }} className="downloadApp"></div>
                        <p>for a better experience.</p>
                    </div>
                    {/* <img src="https://webdesing881317710.files.wordpress.com/2021/05/downloadclickabuy.png" alt="" className="phone"/> */}
                    {/* <div className="relative"> */}
                    <div style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/downloadclickabuy.png')" }} className="phone"></div>
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}
export default MainHome