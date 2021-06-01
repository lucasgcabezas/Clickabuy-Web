import React, { useRef } from "react";
import { useEffect, useState } from "react";

const productos = [
  { name: "cocacola", price: 100, type: "food", reviews: 5 },
  { name: "bencina", price: 200, type: "fuel", reviews: 3 },
  { name: "almendras", price: 300, type: "food", reviews: 2 },
  { name: "Pepsi", price: 500, type: "food", reviews: 4 },
  { name: "Petroleo", price: 240, type: "fuel", reviews: 1 },
  { name: "avellanas", price: 2300, type: "food", reviews: 3 },
];

const min = 0;
const max = 100000;

const MyFilters = () => {
  const [myProducts, setMyProducts] = useState(productos);
  const [myProductsAll, setMyProductsAll] = useState(productos);
  const [myProductsPrice, setMyProductsPrice] = useState(productos);

  const [lowEnd, setLowEnd] = useState(0);
  const [highEnd, setHighEnd] = useState(100000);
  const [reviews, setReviews] = useState([]);

  const handleFilters = (e) => {
    /* console.log("e", e); */
    setMyProducts(productos);

    let newArrayProducts = [];
    switch (e) {
      case "hf":
        newArrayProducts = myProducts.slice().sort((a, b) => b.price - a.price);
        setMyProducts(newArrayProducts);

        break;
      case "lf":
        newArrayProducts = myProducts.slice().sort((a, b) => a.price - b.price);
        setMyProducts(newArrayProducts);
        break;
      case "rPrice":
        debugger;
        if (lowEnd == "" && highEnd == "") {
          setLowEnd(min);
          setHighEnd(max);
          newArrayProducts = myProductsAll.filter((product) => {
            return product.price >= min && product.price <= max;
          });
        } else {
          newArrayProducts = myProductsAll.filter((product) => {
            return product.price >= lowEnd && product.price <= highEnd;
          });
        }
        setMyProducts(newArrayProducts);
        setMyProductsPrice(newArrayProducts);

        textInput1.current.checked =
          textInput2.current.checked =
          textInput3.current.checked =
          textInput4.current.checked =
          textInput5.current.checked =
            false;
        setReviews([]);
        break;

      /*  default:
        return "foo"; */
    }

    if (typeof e == "number") {
      let reviewsAux = reviews;

      if (reviewsAux.includes(e)) {
        reviewsAux.splice(reviewsAux.indexOf(e), 1);
      } else {
        reviewsAux.push(e);
        setReviews(reviewsAux);
      }
      newArrayProducts = myProductsPrice.filter((product) => {
        return reviewsAux.includes(product.reviews);
      });
      setMyProducts(newArrayProducts);

      if (reviewsAux.length == 0) {
        setMyProducts(myProductsPrice);
      }
    }
  };
  const textInput1 = useRef(),
    textInput2 = useRef(),
    textInput3 = useRef(),
    textInput4 = useRef(),
    textInput5 = useRef();

  return (
    <div className="mt-5">
      <div className="w-100 d-flex">
        <div className="w-50 d-flex flex-column bg-light ">
          Filters
          <div className="d-flex mb-5">
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
          <div className="d-flex mb-5 ">
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
            <div className="ml-1 btn btn-primary" onClick={() => handleFilters("rPrice")}>
              unfilter Icon
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
                  handleFilters(5);
                }}
                name={"Z"}
                ref={textInput5}
              ></input>
              <label htmlFor={"Z"}>⭐⭐⭐⭐⭐</label>
            </div>

            <div>
              <input
                /*  style={{ display: "none" }} */
                type="checkbox"
                id={"Z"}
                onClick={() => {
                  handleFilters(4);
                }}
                name={"Z"}
                ref={textInput4}
              ></input>
              <label htmlFor={"Z"}>⭐⭐⭐⭐</label>
            </div>

            <div>
              <input
                /*  style={{ display: "none" }} */
                type="checkbox"
                id={"Z"}
                onClick={() => {
                  handleFilters(3);
                }}
                name={"Z"}
                ref={textInput3}
              ></input>
              <label htmlFor={"Z"}>⭐⭐⭐</label>
            </div>

            <div>
              <input
                /*  style={{ display: "none" }} */
                type="checkbox"
                id={"Z"}
                onClick={() => {
                  handleFilters(2);
                }}
                name={"Z"}
                ref={textInput2}
              ></input>
              <label htmlFor={"Z"}>⭐⭐</label>
            </div>

            <div>
              <input
                /*     style={{ display: "none" }} */
                type="checkbox"
                id={"Z"}
                onClick={() => {
                  handleFilters(1);
                }}
                name={"Z"}
                ref={textInput1}
              ></input>
              <label htmlFor={"Z"}>⭐</label>
            </div>
          </div>
        </div>
        {console.log(myProducts)}
        <div className="w-50 bg-success">
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
