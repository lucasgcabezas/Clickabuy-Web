import React from "react";
import { useEffect, useState } from "react";
const productos = [
  { name: "cocacola", price: 100, type: "food" },
  { name: "bencina", price: 200, type: "fuel" },
  { name: "almendras", price: 300, type: "food" },
];

const MyFilters = () => {
  const [myProducts, setMyProducts] = useState(productos);
  const [lowEnd, setLowEnd] = useState(0);
  const [highEnd, setHighEnd] = useState(10);

  const handleFilters = (e) => {
    console.log("e", e);
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
      default:
        return "foo";
    }
    console.log(newArrayProducts);
  };
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
                onchange={(e) => setHighEnd(e.target.value)}
              />
            </div>
            <div className="btn btn-primary"></div>
          </div>
        </div>
        {console.log(myProducts)}
        <div className="w-50">
          {myProducts.map((product) => {
            return (
              <h2 className="text-dark">
                {product.name}| {product.price}
              </h2>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyFilters;
