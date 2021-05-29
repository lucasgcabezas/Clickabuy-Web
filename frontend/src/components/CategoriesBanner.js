import { connect } from "react-redux"
import categoryActions from "../redux/actions/categoryActions"

const CategoriesBanner = (props) => {
    const { categories } = props
    return (
        <div className="contenedorCategoriesBanner">
            <div className="contenedorCategories">
                <h2>What are you looking for?</h2>
                <div className="flexCategories">
                    {
                        categories.map(category => {
                            return (
                                <div className="category">
                                    <div className="imageCategoryBanner" style={{ backgroundImage: `url('${category.imageCategory}')` }}></div>
                                    <span>{category.nameCategory}</span>
                                </div>
                            )
                        })
                    }
                    <div className="category">
                        <span className="material-icons-outlined iconViewMore">grid_view</span>
                        <span>View More</span>
                    </div>
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