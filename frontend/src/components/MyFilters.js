import React, { useRef } from "react";
import { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import {connect} from 'react-redux'
import productsActions from '../redux/actions/productsActions'


const min = 0;
const max = 100000;
let promedio = 0;
let myArray = [];
const MyFilters = (props) => {
  let myCopia = [];

  props.productsCurrentStore.map((product) => {
  //  props.productsCurrentStore.map((product) => {
    if (product.reviews.length > 0) {
      promedio = product.reviews.reduce((a, b) => a + b.vote, 0) / product.reviews.length;
    } else {
      promedio = 0;
    }
    myCopia.push({ ...product, miPromedio: promedio });
    /*   console.log("soy el promedio", promedio || 0); */
  });



  const [myProducts, setMyProducts] = useState(myCopia);
  const [myProductsAll, setMyProductsAll] = useState(myCopia);
  const [myProductsPrice, setMyProductsPrice] = useState(myCopia);
  const [myPromedio, setMyPromedio] = useState(0);

  const [lowEnd, setLowEnd] = useState(0);
  const [highEnd, setHighEnd] = useState(100000);
  const [averageScores, setAverageScores] = useState([]);

  const handleFilters = (e) => {
    /* console.log("e", e); */
    /* myArray = []; */
    setMyProducts(myCopia);

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
        /*  debugger; */
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
        setAverageScores([]);
        break;

      /*  default:
        return "foo"; */
    }

    if (typeof e == "number") {
      
      let averageScoresAux = averageScores;
      
      if (averageScoresAux.includes(e)) {
          averageScoresAux = averageScoresAux.filter(aReviewAux => {
            return aReviewAux !== e})
      } else {
        averageScoresAux.push(e);
      }
      setAverageScores(averageScoresAux);  
      

      if(averageScoresAux.length === 0){
        averageScoresAux = [0,1,2,3,4,5]
      }
      newArrayProducts = myCopia.filter((product) => {    
        return averageScoresAux.includes(product.miPromedio);
      });
        
      
      
      
      newArrayProducts = myCopia.filter((product) => {    
        return averageScoresAux.includes(product.miPromedio);
      });
      setMyProducts(newArrayProducts);
      console.log(newArrayProducts)
      if (averageScoresAux.length == 0) {
        setMyProducts(myProductsPrice);
      }
    }
  
    props.filterProductsByMyFilter(newArrayProducts,props.inputSearch);  
    
    /*if(props.filterProductCurrentStore.length === 0){
      props.filterProductsByMyFilter(props.productsCurrentStore);  
    }
    else{
      props.filterProductsByMyFilter(newArrayProducts);
    }*/
    
      
  };
  const textInput1 = useRef(),
    textInput2 = useRef(),
    textInput3 = useRef(),
    textInput4 = useRef(),
    textInput5 = useRef();

  /*  console.log("soy los productos de lucas", props.filterProductCurrentStore); */
  /*  props.changeLinkText(myProducts); */

  return (
    <div className="mt-5">
      <div>
        <i class="fas fa-filter"></i>
      </div>
      <div className="w-100 d-flex">
        <div className="w-50 d-flex flex-column bg-light ">
          Filters
          <div className="d-flex mb-5">
            <h5 className="small">sort by price</h5>
            <div
              className="btn btn-primary"
              onClick={() => {
                handleFilters("hf");
              }}
            >
              ▼
            </div>
            <div
              className="btn btn-primary"
              onClick={(e) => {
                handleFilters("lf");
              }}
            >
              ▲
            </div>
          </div>
          <div>
            <h5 className="small"> by price range</h5>
            
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
        {/*   {console.log(myProducts)} */}
        <div className="w-50 bg-success">
          {myProducts.map((product) => {
            return (
              <p>
                {product.nameProduct} {"|"} {product.price} {"|"}
                {product.miPromedio}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filterProductCurrentStore : state.productReducer.filterProductCurrentStore,
    productsCurrentStore: state.productReducer.productsCurrentStore,
  };
};

const mapDispatchToProps = {
  filterProductsByMyFilter: productsActions.filterProductsByMyFilter,
  filterProductsCurrentStore: productsActions.filterProductsCurrentStore,
};

export default connect(mapStateToProps,mapDispatchToProps)(MyFilters);
