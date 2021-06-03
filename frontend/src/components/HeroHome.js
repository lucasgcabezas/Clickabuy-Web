const HeroHome = () => {
    return (
        <div className="galleryContainer">
            <div className="galleryItem">
                <video src="./assets/nikeBanner.mp4" autoPlay loop muted className="videoHeroHome"></video>
            </div>
            <div className="galleryItem">
                <div style={{backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/06/airpodsbanner.jpg')"}} className="galleryImg" ></div>
            </div>
            <div className="galleryItem">
                <div style={{backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/06/furniturebanner.jpg')"}} className="galleryImg"></div>
            </div>
        </div>
    )
}
export default HeroHome