const Product = ({ product }) => {
    const { stock, description, nameProduct, price, productImg } = product
    return (
        <div className="cardProduct">
            <div>{productImg}</div>
            <div className="cardProductInfo">
                <h3>{nameProduct}</h3>
                <p className="descriptionProduct">{description}</p>
                <p>Stock: {stock}</p>
                <p>Price: {price}</p>
            </div>
            <button className="buttonAddProduct">+ Add Product</button>
        </div>
    )
}
export default Product