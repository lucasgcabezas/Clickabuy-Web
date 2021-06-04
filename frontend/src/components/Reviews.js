import { connect } from "react-redux"
import productsActions from "../redux/actions/productsActions"
import { IoSend } from 'react-icons/io5'
import { useState } from "react"
import Review from '../components/Review'
import ReactStars from 'react-stars'


const Reviews = (props) => {
    const { setReviews, reviews, userLogged, addReview, editReview, deleteReview, product, productSelected, rateProduct } = props
    const [inputReview, setInputReview] = useState({ review: '', token: '', vote: 0 })
    const [loadingReviews, setLoadingReviews] = useState(true)
    // const [starState, setStarState] = useState(0)

    let input = userLogged ? { inputReview: 'Write a review...', disabled: false } : { inputReview: 'You must be logged in to post a review', disabled: true }
    let buttonDisabled = inputReview.review ? false : true

    const leerInput = (e) => {
        setInputReview({
            ...inputReview,
            review: e.target.value,
            token: userLogged.token
        })
    }

    const changeValueStar = (e) => {
        setInputReview({
            ...inputReview,
            vote: e
        })
    }

    const sendReview = async (e) => {
        const spaceComment = inputReview.review.charAt(0)
        if (userLogged) {
            if (spaceComment === " " || inputReview.review === "" || inputReview.vote === 0) {
                alert("You can't post an empty comment")
            } else {
                setLoadingReviews(false)
                const response = await addReview(inputReview, product)
                setReviews(response.reviews)
                setInputReview({ review: '', token: '' })
                setLoadingReviews(true)
            }

        } else {
            alert("You must be logged in to post a review")
        }
    }
    const updatedReview = async (review, idReview) => {
        const response = await editReview(product, review, idReview)
        setReviews(response)
    }
    const deleteReviews = async (idReview) => {
        const response = await deleteReview(product, idReview)
        setReviews(response.reviews)
    }
    const sendEnter = (e) => {
        if (e.key === 'Enter') {
            sendReview()
        }
    }

    console.log(reviews)

    let ratingCounter = 0

    let star1 = 0
    let star2 = 0
    let star3 = 0
    let star4 = 0
    let star5 = 0

    reviews.forEach(rating => {
        if (rating.vote === 1) {
            star1++
        } else if (rating.vote === 2) {
            star2++
        }
        else if (rating.vote === 3) {
            star3++
        }
        else if (rating.vote === 4) {
            star4++
        }
        else if (rating.vote === 5) {
            star5++
        }

        ratingCounter = ratingCounter + rating.vote
    })
    let starsValue = ratingCounter / reviews.length



    return (
        <div className="contenedorReviews">
            <div className="tituloReviews">Reviews of Products </div>

            <div className="starsReviewsContainer" >
                <div className="starsReviews">
                    <span style={{ fontSize: 50, fontWeight: 'lighter' }}>{(isNaN(starsValue)) ? 0 : (starsValue).toFixed(1)}</span>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 40 }}>
                        <ReactStars
                            // onChange={(e) => changeValueStar(e)}
                            count={5}
                            size={50}
                            isHalf={true}
                            edit={false}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            // activeColor="#ffd700"
                            color2="#dca6ac"
                            color1="#555555"
                            value={starsValue}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <div className="progressStarContainer">
                        <span>1 star </span>
                        <progress id="file" value={star1} max={reviews.length}></progress>
                        <span>({star1})</span>
                    </div>
                    <div className="progressStarContainer">
                        <span>2 stars</span>

                        <progress id="file" value={star2} max={reviews.length}></progress>
                        <span>({star2})</span>
                    </div>
                    <div className="progressStarContainer">
                        <span>3 stars</span>
                        <progress id="file" value={star3} max={reviews.length}></progress>
                        <span>({star3})</span>
                    </div>
                    <div className="progressStarContainer">
                        <span>4 stars</span>
                        <progress id="file" value={star4} max={reviews.length}></progress>
                        <span>({star4})</span>
                    </div>
                    <div className="progressStarContainer">
                        <span>5 stars</span>
                        <progress id="file" value={star5} max={reviews.length}></progress>
                        <span>({star5})</span>
                    </div>
                </div>
            </div>
            <span style={{ fontSize: 15 }}>Based on {reviews.length} Reviews</span>
            <div className="reviewsInfo">
                {reviews.length === 0
                    ? <div className="noReviews">
                        <p>No comments yet</p>
                        <p>Be the first to post one!</p>
                    </div>
                    :
                    <div className="reviews">
                        {reviews.map(review => {
                            return (
                                <Review key={review._id} review={review} updatedReview={updatedReview} deleteReviews={deleteReviews} productSelected={productSelected} />
                            )
                        })}
                    </div>
                }
            </div>
            {/* <div className="contenedorEmojis">{visible && <Picker onEmojiClick={onEmojiClick} className="emojis"/>}</div> */}


            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 40 }}>
                <ReactStars
                    onChange={(e) => changeValueStar(e)}
                    count={5}
                    size={32}
                    isHalf={true}
                    edit={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    // activeColor="#dca6ac"
                    // activeColor="#48d1be"
                    // color="#dca6ac"
                    color2="#dca6ac"
                    color1="#555555"
                    value={0}
                />
            </div>

            <div className="contenedorInputReviews">
                <input className="inputReviews" type="text" placeholder={input.inputReview} onKeyDown={sendEnter} value={inputReview.review} disabled={input.disabled} onChange={leerInput} />
                {/* {userLogged && <GrEmoji onClick={()=> setVisible(!visible)} className="iconoEmoji" />} */}
                <IoSend onClick={() => loadingReviews ? sendReview() : null} disabled={buttonDisabled} className="iconSend" />
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged
    }
}
const mapDispatchToProps = {
    addReview: productsActions.addReview,
    editReview: productsActions.editReview,
    deleteReview: productsActions.deleteReview,
    rateProduct: productsActions.rateProduct
}
export default connect(mapStateToProps, mapDispatchToProps)(Reviews)