import React from 'react'
import citiesActions from '../redux/actions/citiesActions'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

const Filtro = (props) => {   
    return (
        <>    
            <input className='txtBuscador' type="Buscar" name="" id="buscar" placeholder="What city are you looking for?" onChange={(e) => {props.filtrar(e.target.value)}} />
            
            {props.filtrarCiudades.length === 0 ? <h2 className='cartelSinCiudad'>We don´t have any city that matches your search! Try another one!</h2> : props.filtrarCiudades.map((ciudad, id) => {
        return( 
            
            <div key={id} className='listCities'>
                <div className='itemCities' style = {{backgroundImage:`url('${ciudad.photoCity}')`}} >
                <NavLink to={`/city/${ciudad._id}`}><h4 className='nameCity' onClick={(e)=>{props.cargarCiudad(e.target.value)}}>{ciudad.nameCity}</h4></NavLink>
                </div>
            </div>       
            
        )})}
        </>
    )
}
const mapStateToProps = state =>{
    return{
        filtrarCiudades: state.city.filtrarCiudades
    }
}
   
const mapDispatchToProps = {
    filtrar: citiesActions.filtrarCiudad,
    cargarCiudad: citiesActions.cargarCities
}
export default connect(mapStateToProps, mapDispatchToProps)(Filtro)