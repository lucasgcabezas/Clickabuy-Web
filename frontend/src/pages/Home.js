import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import CategoriesBanner from '../components/CategoriesBanner'
import MainHome from '../components/MainHome'
import HeroHome from '../components/HeroHome'

class Home extends React.Component{
    componentDidMount(){
        window.scrollTo(0,0)
    }
    render(){
        return(
            <div className="contenedorHome">  
                <Header/>
                <Hero />
                <HeroHome/>
                <CategoriesBanner/>
                <MainHome/>    
                <Footer /> 
            </div>
        )        
    }
}

export default Home;