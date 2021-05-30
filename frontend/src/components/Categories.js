import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import categoryActions from "../redux/actions/categoryActions"
import Dropdown from 'react-bootstrap/Dropdown'
const Categories = (props) => {
    const { getAllCategories } = props
    useEffect(() => {
        getAllCategories()
    }, [])
    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
                Categories
        </Dropdown.Toggle>
            <Dropdown.Menu>
                {props.categories.length === 0
                    ? <span>No Categories</span>
                    : props.categories.map((category, index) => {
                        return <Link to={`/category/${category._id}`} className="nameCategory" key={index}><span>{category.nameCategory}</span></Link>
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
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