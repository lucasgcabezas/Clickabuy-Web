import { connect } from "react-redux"
import productsActions from "../redux/actions/productsActions"
import { IoSend } from 'react-icons/io5'
import { useState } from "react"
import Review from '../components/Review'
const Reviews = (props) => {
    const { setReviews, reviews, userLogged, addReview, editReview, deleteReview, product } = props
    const [inputReview, setInputReview] = useState({ review: '', token: '' })
    const [loadingReviews, setLoadingReviews] = useState(true)

    let input = userLogged ? { inputReview: 'Write a review...', disabled: false } : { inputReview: 'You must be logged in to post a review', disabled: true }
    let buttonDisabled = inputReview.review ? false : true

    const leerInput = (e) => {
        setInputReview({
            ...inputReview,
            review: e.target.value,
            token: userLogged.token
        })
    }

    const sendReview = async (e) => {
        const spaceComment = inputReview.review.charAt(0)
        if (userLogged) {
            if (spaceComment === " " || inputReview.review === "") {
                alert("You can't post an empty review")
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
    return (
        <div className="contenedorReviews">
                <div className="tituloReviews">Reviews of Product <span>({reviews.length})</span></div>
                {reviews.length === 0
                    ? <div className="noReviews">
                        <p>No reviews yet</p>
                        <p>Be the first to post one!</p>
                    </div>
                    :
                    <div className="reviews">
                        {reviews.map(review => {
                            return (
                                <Review key={review._id} review={review} updatedReview={updatedReview} deleteReviews={deleteReviews} />
                            )
                        })}
                    </div>
                }
                {/* <div className="contenedorEmojis">{visible && <Picker onEmojiClick={onEmojiClick} className="emojis"/>}</div> */}
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
    deleteReview: productsActions.deleteReview
}
export default connect(mapStateToProps, mapDispatchToProps)(Reviews)