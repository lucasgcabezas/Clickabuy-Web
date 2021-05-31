import React from 'react'
import productsActions from '../redux/actions/productsActions'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

const ProductFilter = (props) => {
    console.log(props)   
    return (
        <>    
            <input className='txtBuscador' type="Buscar" name="" id="buscar" placeholder="Find your perfect product!" onChange={(e) => {props.filter(e.target.value)}} />
            
            {props.filterProducts.length === 0 ? <h2 className='cartelSinCiudad'>We don´t have any product that matches your search! Try another one!</h2> : props.filterProducts.map((product, id) => {
        return( 
            
            <div key={id} className='listProducts'>
                <div className='itemProduct' style = {{backgroundImage:`url('${product.productImg}')`}} >
                <NavLink to={`/products/${product._id}`}><h4 className='nameProduct' onClick={(e)=>{props.getProductsFromStore(e.target.value)}}>{product.nameProduct}</h4></NavLink>
                </div>
            </div>       
            
        )})}
        </>
    )
}
const mapStateToProps = state =>{
    return{
        filter: state.productReducer.filterProducts
    }
}
   
const mapDispatchToProps = {
    filterProducts: productsActions.filterProducts,
    getProductsFromStore: productsActions.getProductsFromStore
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductFilter)