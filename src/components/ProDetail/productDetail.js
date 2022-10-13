import "./productDetail.css";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import env from "react-dotenv";
import { useSelector, useDispatch } from "react-redux";
import {addProductDetail} from "../../redux/action/getDataAction";
import {Loader} from "../loading"


export const ProductDetail = () => {
  const productDetail = useSelector(store=>store.ProductDetailReducer);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    getProductDetail();
  }, []);

 

  function getProductDetail() {
    axios
      .get(`${env.BASE_URL}/product/${id}`)
      .then(({ data }) => {
        console.log(data)
        dispatch(addProductDetail(data))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>{productDetail.status?(<div className="pcontainer">
    <div className="plcontaine">
      <div
        id="carouselExampleControlsNoTouching"
        class="carousel slide"
        data-bs-touch="false"
        data-bs-interval="false"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/TVs/Jup22/Kamya/MiRedmi/R01_PC_CategoryCard_758X608._SY304_CB608210661_.jpg"
              class="ProductImage"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://m.media-amazon.com/images/I/41mDAtPMDKL._AC_SY200_.jpg"
              class="ProductImage"
              alt="..."
            />
          </div>
          <div class="carousel-item IMdiv">
            <img
              src="https://m.media-amazon.com/images/I/410iWt8d79L._AC_SY200_.jpg"
              class="ProductImage"
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControlsNoTouching"
          data-bs-slide="prev"
        >
          <span
            class="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControlsNoTouching"
          data-bs-slide="next"
        >
          <span
            class="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    {/* detail of product is start from here ----------------*/}
    <div className="plcontainer">
      <h2>{productDetail.name}</h2>
      <div>
        <ReactStars
          {...{
            edit: false,
            color: "rgba(20,20,20,0.1",
            activeColor: "tomato",
            size: window.innerWidth < 600 ? 20 : 25,
            value: productDetail.rating,
            isHalf: true,
          }}
        />
        <span>({productDetail.numOfReviews} Reviews)</span>
      </div>
      <h3>
        <span>Price ₹ {productDetail.Nprice}</span>{" "}
        <s> {productDetail.discount!==0?("₹"+productDetail.Oprice):("")}</s>
        <span>{productDetail.discount!==0?("  ("  +productDetail.discount+ "% off)"):("")}</span>{" "}
      </h3>
      <p>stock {productDetail.stock}</p>
      <div>
        <button type="button" class="btn btn-primary me-5 ">
          Cart +
        </button>
        <button type="button" class="btn btn-warning ms-5">
          Buy Now
        </button>
      </div>
    </div>
  </div>):(<Loader/>)}
      
    </>
  );
};
