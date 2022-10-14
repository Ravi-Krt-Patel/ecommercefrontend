import "./productDetail.css";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import env from "react-dotenv";
import { useSelector, useDispatch } from "react-redux";
import {addProductDetail,addCartDetail,cartDataLoading} from "../../redux/action/getDataAction";
import {Loader} from "../loading"
import {Link} from "react-router-dom";

export const ProductDetail = () => {
  const productDetail = useSelector(store=>store.ProductDetailReducer);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    getProductDetail();
  }, []);

  function addToCart() {
    axios.get(`${env.BASE_URL}/addToCart`).then(({data})=>{
      let check = false;
      let qt = 0;
			data.addtocart.forEach((el)=>{
        if(el.item._id === id){
          check = true;
          qt = el.quantity;
        }
      })
      if(check){
        if (productDetail.stock > qt) {
          axios
            .post(`${env.BASE_URL}/addToCart`, {
              itemId: id,
            })
            .then(({ data }) => {
              console.log(data);
              alert("item is added successfully");
              //when item get added
              axios
                .get(`${env.BASE_URL}/addToCart`)
                .then(({ data }) => {
                  dispatch(addCartDetail(data));
                  console.log(data);
                  dispatch(cartDataLoading(true));
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("limit exceeded for adding to cart");
        }
      }else{
        axios
            .post(`${env.BASE_URL}/addToCart`, {
              itemId:id,
            })
            .then(({ data }) => {
              alert("item added successfully");
              //dispatch(cartDataLoading(false))
              //for updating the results
              axios
                .get(`${env.BASE_URL}/addToCart`)
                .then(({ data }) => {
                  dispatch(addCartDetail(data));
                  console.log(data);
                  dispatch(cartDataLoading(true));
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
      }

		})
		.catch((err)=>{console.log(err);})
 
  }
 

  function getProductDetail() {
    axios
      .get(`${env.BASE_URL}/product/${id}`)
      .then(({ data }) => {
        console.log(data,"this is product detail")
        dispatch(addProductDetail(data))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const user = JSON.parse(localStorage.getItem("UserDetail"));

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
      {productDetail.stock !==0?(
        <div>
          <Link style={{ textDecoration: "none" }} to={user?("/productDetail"):("/login")} > 
            <button type="button" class="btn btn-primary me-5 " onClick={addToCart} >
             Cart +
            </button>
        </Link>
        <Link style={{ textDecoration: "none" }}
            to={user ? ("/allUserAddress") : ("/login")} >
        <button type="button" class="btn btn-warning ms-5" >
          Buy Now
        </button>
        </Link>
        
        
      </div>
      ):(<div>
        <button type="button" class="btn btn-primary me-5 " disabled >
          Cart +
        </button>
       
        <button type="button" class="btn btn-warning ms-5" disabled >
          Buy Now
        </button>
      </div>)}
      
    </div>
  </div>):(<Loader/>)}
      
    </>
  );
};
