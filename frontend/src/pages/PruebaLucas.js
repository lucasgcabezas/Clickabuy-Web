import React from "react";
// import "./styles.css";
import ReactStars from "react-rating-stars-component"



const PruebaLucas = () => {

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    

    return (
        <div style={{ textAlign: 'center', backgroundColor: 'red', height: '100px', paddingTop: '20px' }}>

            <ReactStars
                count={5}
                onChange={ratingChanged}
                size={32}
                isHalf={true}
                edit={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
                // activeColor="#48d1be"
                color="#444444"
                value={2}
            />




        </div >

    )

}

export default PruebaLucas
