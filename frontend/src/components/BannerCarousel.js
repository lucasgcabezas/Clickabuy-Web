import Carousel from 'react-bootstrap/Carousel'
const BannerCarousel = () => {
    const bannerArray = [
        {id: 1, imageBanner: "https://webdesing881317710.files.wordpress.com/2021/05/1-1.png"},
        {id: 2, imageBanner: "https://webdesing881317710.files.wordpress.com/2021/05/2-1.png"},
        {id: 3, imageBanner: "https://webdesing881317710.files.wordpress.com/2021/05/3-1.png"},
        {id: 4, imageBanner: "https://webdesing881317710.files.wordpress.com/2021/05/5.png"},
        {id: 5, imageBanner: "https://webdesing881317710.files.wordpress.com/2021/05/4-1.png"}
    ]
    return(
        <Carousel className="carrouselBanner">
            {bannerArray.map(banner => {
                return (
                    <Carousel.Item interval={2000} key={banner._id}>
                        <div className="imageBanner" style={{ backgroundImage: `url('${banner.imageBanner}')` }} alt="" />
                        {/* <Carousel.Caption className="caption">
                            <p>{activity.nameActivity}</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                )
            })}
        </Carousel>
    )
}
export default BannerCarousel