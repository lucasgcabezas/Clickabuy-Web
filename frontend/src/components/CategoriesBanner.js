import { useState } from "react"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
const CategoriesBanner = (props) => {
    const { categories } = props
    const [show, setShow] = useState(false)
    let display = !show ? 'none' : 'flex'
    const firstCategories = categories.filter((category, index) => index < 5)
    const secondCategories = categories.filter((category, index) => index >= 5)
    return (
        <div className="contenedorCategoriesBanner">
            <div className="contenedorCategories">
                <h2>What are you looking for?</h2>
                <div className="flexCategories">
                    {
                        firstCategories.map(category => {
                            return (
                                <Link to={`/category/${category._id}`} className="nameCategoryBanner category">
                                    <div className="imageCategoryBanner" style={{ backgroundImage: `url('${category.imageCategory}')` }}></div>
                                    <span>{category.nameCategory}</span>
                                </Link>
                            )
                        })

                    }
                    <div className="category" onClick={() => setShow(!show)}>
                        <span className="material-icons-outlined iconViewMore">grid_view</span>
                        <span>View More</span>
                    </div>
                    <Modal
                        isOpen={show}
                        onRequestClose={() => setShow(!show)}
                        contentLabel="Example Modal"
                        className="ModalComponent"
                        overlayClassName="OverlayModal"
                    >
                        <div id="modal" style={{ display: display }}>
                            <div style={{ display: "flex" }}>
                                <span className="material-icons-outlined closeModal" onClick={() => setShow(false)}>close</span>
                            </div>
                            <div className="flexCategoriesModal">
                                {
                                    secondCategories.map(category => {
                                        return (
                                            <Link to={`/category/${category._id}`} className="nameCategoryBanner category categoryModal">
                                                <div className="imageCategoryBanner" style={{ backgroundImage: `url('${category.imageCategory}')` }}></div>
                                                <span>{category.nameCategory}</span>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        categories: state.categoryReducer.categories,
    }
}

export default connect(mapStateToProps)(CategoriesBanner)