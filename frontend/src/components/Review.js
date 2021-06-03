import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import { TiDelete } from 'react-icons/ti'
import { IoSend } from 'react-icons/io5'
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

// const MySwal = withReactContent(Swal)

const Comment = (props) => {
    const { review, updatedReview, deleteReviews, userLogged } = props
    const [reviewContent, setReviewContent] = useState(review.review)
    const [visible, setVisible] = useState(false)
    const [enabledUser, setEnabledUser] = useState(false)
    const [updateReview, setUpdateReview] = useState(false)
    // console.log(userLogged)
    console.log(review)
    useEffect(() => {
        if (userLogged && userLogged.email === review.userId.email) {
            setEnabledUser(true)
        }
    }, [])
    const sendEnter = (e) => {
        if (e.key === 'Enter') {
            updatedReview(reviewContent, review._id)
            setVisible(false)
            setReviewContent(!reviewContent)
        }
    }
    
    return (
        <div className="contenedorInfo">
            <div className="datosUserReview">
                <div>
                    <p>{review.userId.firstName} {review.userId.lastName}</p>
                </div>
            </div>
            <div className="contenedorReview">
                {!updateReview
                    ? <div className="nameReview">
                        <p>{review.review}</p>
                    </div>
                    : <div className="contenedorInputEdit">
                        <input type="text" value={reviewContent} onChange={e => setReviewContent(e.target.value)} onKeyDown={sendEnter} />
                        <IoSend className="iconSendEdit" onClick={() => { updatedReview(reviewContent, review._id); setVisible(false); setUpdateReview(!updateReview) }} />
                    </div>

                }
                {
                    enabledUser &&
                    <div className="contenedorButtonsOptions">
                        <div onClick={() => { setUpdateReview(!updateReview) }}>
                            {!updateReview ? <FaPencilAlt /> : <TiDelete />}
                        </div>
                        <FaTrashAlt onClick={() => { deleteReviews(review._id) }}></FaTrashAlt>
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged
    }
}
export default connect(mapStateToProps)(Comment)