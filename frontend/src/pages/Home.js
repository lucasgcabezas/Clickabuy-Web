import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import {NavLink} from 'react-router-dom'

class Home extends React.Component{
    componentDidMount(){
        window.scrollTo(0,0)
    }
    
    render(){
        return(
            <>  
            <div className='principalContainer'>                              
                <Header />
                <Hero />
                <Footer />                
            </div>
            </>
        )        
    }
}

export default Home;