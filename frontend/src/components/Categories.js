import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import categoryActions from "../redux/actions/categoryActions"

const Categories = (props) => {
    const {getAllCategories} = props
    // const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories()
    }, [])

    // const fetchCategoriesData = async () => {
    //     const response = await getAllCategories()
    //     // setCategories(response)
    // }

    return(
        <div className="containerCategories">
            <div>
                <span>Categories:</span>
            </div>
            {   props.categories.length === 0 
                ? <span>no categories</span>
                : props.categories.map((category, index) => {
                    return <Link to={`/category/${category._id}`} className="nameCategory" key={index}><span>{category.nameCategory}</span></Link>
                    })
            }
        </div>
    )
}
const mapStateToProps = state => {
    return {
        categories: state.categoryReducer.categories
    }
}        
const mapDispatchToProps = {
    getAllCategories: categoryActions.getAllCategories
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories)