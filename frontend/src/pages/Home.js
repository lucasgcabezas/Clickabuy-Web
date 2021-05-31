import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import Categories from '../components/Categories'
import BannerCarousel from '../components/BannerCarousel'
import CategoriesBanner from '../components/CategoriesBanner'
import MainHome from '../components/MainHome'

class Home extends React.Component{
    componentDidMount(){
        window.scrollTo(0,0)
    }
    render(){
        return(
            <div className="contenedorHome">  
            {/* <div className='principalContainer'>                              */}
                <Header/>
                <Hero />
                <BannerCarousel/>
                <CategoriesBanner/>
                <MainHome/>    
                <Footer /> 
            {/* </div> */}
            </div>
        )        
    }
}

export default Home;