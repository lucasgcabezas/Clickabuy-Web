import React from "react";
import { useEffect, useState } from "react";
const productos = [
  { name: "cocacola", price: 100, type: "food", reviews: 4.5 },
  { name: "bencina", price: 200, type: "fuel", reviews: 3 },
  { name: "almendras", price: 300, type: "food", reviews: 2 },
];

const MyFilters = () => {
  const [myProducts, setMyProducts] = useState(productos);
  const [lowEnd, setLowEnd] = useState(0);
  const [highEnd, setHighEnd] = useState(10);
  const [reviews, setReviews] = useState([]);

  const handleFilters = (e) => {
    console.log("e", e);
    /*  console.log("reviews", reviews); */
    let newArrayProducts = [];
    switch (e) {
      case "hf":
        alert("entre hf");
        newArrayProducts = myProducts.slice().sort((a, b) => b.price - a.price);
        setMyProducts(newArrayProducts);
        break;
      case "lf":
        alert("entre lf");
        newArrayProducts = myProducts.slice().sort((a, b) => a.price - b.price);
        setMyProducts(newArrayProducts);
        break;

      case "rPrice":
        newArrayProducts = myProducts.filter((product) => {
          return product.price >= lowEnd && product.price <= highEnd;
        });
        setMyProducts(newArrayProducts);
        break;

      case "threeStar":
        /*    console.log("rating", reviews); */
        if (!reviews.includes(3)) {
          console.log("no lo incluyo a 3");
          setReviews([...reviews, 3]);
        }
        /*   console.log("rating", reviews); */
        newArrayProducts = myProducts.filter((product) => {
          console.log("review indi", product.reviews);
          console.log("RReviews indi", reviews);
          return reviews.includes(product.reviews) || product.reviews == 3;
        });
        setMyProducts(newArrayProducts);
        break;

      default:
        return "foo";
    }
    console.log(newArrayProducts);
  };

  console.log("reviews", reviews);
  return (
    <div className="mt-5">
      <div className="w-100 d-flex">
        <div className="w-50 d-flex flex-column bg-info">
          Filters
          <div className="d-flex">
            <div
              className="btn btn-primary"
              onClick={() => {
                handleFilters("hf");
              }}
            >
              higher price first
            </div>
            <div
              className="btn btn-primary"
              onClick={(e) => {
                handleFilters("lf");
              }}
            >
              lower price first
            </div>
          </div>
          <div className="d-flex ">
            <div>
              <input
                id="lowEnd"
                name="lowEnd"
                type="number"
                min={0}
                max={highEnd}
                value={lowEnd}
                step={5}
                onChange={(e) => setLowEnd(e.target.value)}
              />
            </div>
            <div>
              <input
                id="highEnd"
                name="highEnd"
                type="number"
                min={lowEnd}
                step={5} /* onChange={cargarFoto} */
                value={highEnd}
                onChange={(e) => setHighEnd(e.target.value)}
              />
            </div>
            <div className="btn btn-primary" onClick={() => handleFilters("rPrice")}>
              filter Icon
            </div>
          </div>
          {lowEnd > highEnd && <div>enter a valid price range</div>}
          <div>
            <div>
              <div>by opinions of Customers</div>
              <input
                /*  style={{ display: "none" }} */
                type="checkbox"
                id={"Z"}
                onClick={() => {
                  alert("hola");
                }}
                name={"Z"}
              ></input>
              <label htmlFor={"Z"}>⭐⭐⭐⭐⭐</label>
            </div>

            <div>
              <input
                /*  style={{ display: "none" }} */
                type="checkbox"
                id={"Z"}
                onClick={() => {
                  alert("hola");
                }}
                name={"Z"}
              ></input>
              <label htmlFor={"Z"}>⭐⭐⭐⭐</label>
            </div>

            <div>
              <input
                /*  style={{ display: "none" }} */
                type="checkbox"
                id={"Z"}
                onClick={() => {
                  handleFilters("threeStar");
                }}
                name={"Z"}
              ></input>
              <label htmlFor={"Z"}>⭐⭐⭐</label>
            </div>

            <div>
              <input
                /*  style={{ display: "none" }} */
                type="checkbox"
                id={"Z"}
                onClick={() => {
                  alert("hola");
                }}
                name={"Z"}
              ></input>
              <label htmlFor={"Z"}>⭐⭐</label>
            </div>

            <div>
              <input
                /*     style={{ display: "none" }} */
                type="checkbox"
                id={"Z"}
                onClick={() => {
                  alert("hola");
                }}
                name={"Z"}
              ></input>
              <label htmlFor={"Z"}>⭐</label>
            </div>
          </div>
        </div>
        {console.log(myProducts)}
        <div className="w-50">
          {myProducts.map((product) => {
            return (
              <h6 className="text-dark">
                {product.name}| {product.price} |{product.reviews}
              </h6>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyFilters;
