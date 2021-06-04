import { connect } from 'react-redux'
import '../css/jona.css'
import { Link, NavLink } from 'react-router-dom'
import Header from '../components/Header'
import adminStoreActions from '../redux/actions/adminStoreActions'
import { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component"



const MyStore = (props) => {

    const { userLogged, getStoresByUser } = props

    const [storesOfUser, setStoresOfUser] = useState([])

    useEffect(() => {
        fetchAllStores()
    }, [])

    const fetchAllStores = async () => {
        const response = await getStoresByUser(userLogged.token)
        console.log(response)
        setStoresOfUser(response)
    }

    // console.log()

    return (
        <>
            <Header />
            <div className="myStoreContainer">
                <span style={{ textAlign: "center" }}>YOUR STORES</span>

                <div className="containerOfItemsMyStores">

                    <Link to="SignUpStore" className="categoryStoresCards storeCardsAdmin" style={{ backgroundColor: '#ffffff' }}>
                        <span style={{ fontSize: 25, color: '#000000' }}>ADD NEW STORE</span>
                        <span style={{ fontSize: 40, color: '#000000' }}>+</span>
                    </Link>

                    {
                        storesOfUser.length === 0
                            ? <span>You dont have any store yet.</span>
                            : storesOfUser.map((store, i) => {
                                let ratingCounter = 0

                                store.rate.forEach(rating => {
                                    ratingCounter = ratingCounter + rating.vote
                                })
                                let starsValue = ratingCounter / store.rate.length

                                return (
                                    <NavLink to={`/store/${store._id}`} className="linkStore categoryStoresCards" key={i} >
                                        <div>
                                            <div style={{ backgroundImage: `url('${store.logoStore.url}')` }} className="logoStoreCategory"></div>
                                            <span className="nameStoresCards">{store.nameStore}</span>
                                            {/* <span className="nameCategoryStoresCards">STARTS</span> */}
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 40 }}>
                                                <ReactStars
                                                    count={5}
                                                    size={32}
                                                    isHalf={true}
                                                    edit={false}
                                                    emptyIcon={<i className="far fa-star"></i>}
                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                    fullIcon={<i className="fa fa-star"></i>}
                                                    activeColor="#ffd700"
                                                    // activeColor="#48d1be"
                                                    color="#999999"
                                                    value={starsValue}
                                                />
                                                < span style={{ fontSize: 12, verticalAlign: 'center', marginTop: 5, marginLeft: 5, color: '#777777' }} >({store.rate.length})</span>
                                            </div>
                                            {/* <span className="nameCategoryStoresCards">{currentCategory.nameCategory}</span> */}
                                        </div>
                                    </ NavLink>
                                )
                            })
                    }


                    {/* <Link to="/myStoreView"><div className="oneStore"></div></Link>
                    <div className="oneStore"></div>
                    <div className="oneStore"></div>
                    <div className="oneStore"></div>
                    <div className="oneStore"></div>
                    <div className="oneStore"></div>
                    <div className="oneStore"></div> */}

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
    getStoresByUser: adminStoreActions.getStoresByUser,

};

export default connect(mapStateToProps, mapDispatchToProps)(MyStore);



