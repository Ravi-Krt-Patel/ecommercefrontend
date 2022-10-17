import "./productDetail.css";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import env from "react-dotenv";
import { useSelector, useDispatch } from "react-redux";
import {addProductDetail,addCartDetail,cartDataLoading,addAllReviews} from "../../redux/action/getDataAction";
import {Loader} from "../loading"
import {Link} from "react-router-dom";
import BasicRating from "../rating";

export const ProductDetail = () => {
  const productDetail = useSelector(store=>store.ProductDetailReducer);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [review, setReview] = useState("");
  //console.log(productDetail,"product detail")
  useEffect(() => {
    getProductDetail();
    getAllReviews();
  }, [productDetail.userRating,productDetail.rating]);

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
              //console.log(data);
              alert("item is added successfully");
              //when item get added
              axios
                .get(`${env.BASE_URL}/addToCart`)
                .then(({ data }) => {
                  dispatch(addCartDetail(data));
                 // console.log(data);
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
                  //console.log(data);
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
      //  console.log(data,"this is product detail")
        dispatch(addProductDetail(data))
      })
      .catch((err) => {
        console.log(err);
      });
  }


  function getAllReviews (){
    axios
      .get(`${env.BASE_URL}/reviews/${id}`)
      .then(({ data }) => {
        console.log(data,"this is for product revies")
        dispatch(addAllReviews(data))
      })
      .catch((err) => {
        console.log(err);
      });
  }



  const user = JSON.parse(localStorage.getItem("UserDetail"));

  return (
    <>{productDetail.status?(<div className="pcontainer">

<div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000">
     
         <img src={productDetail.image[0]} style={{width:"20vw"}}  alt="..."/>
         {/* className="d-block w-40" */}
      
      <div className="carousel-caption d-none d-md-block">
        
      </div>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src={productDetail.image[1]} style={{width:"20vw"}}  alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        
      </div>
    </div>
    <div className="carousel-item">
      <img src={productDetail.image[2]} style={{width:"20vw"}} alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>


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
            <button type="button" className="btn btn-primary me-5 " onClick={addToCart} >
             Cart +
            </button>
        </Link>
        <Link style={{ textDecoration: "none" }}
            to={user ? ("/allUserAddress") : ("/login")} >
        <button type="button" className="btn btn-warning ms-5" >
          Buy Now
        </button>
        </Link>
        
        
      </div>
      ):(<div>
        <button type="button" className="btn btn-primary me-5 " disabled >
          Cart +
        </button>
       
        <button type="button" className="btn btn-warning ms-5" disabled >
          Buy Now
        </button>
      </div>)}
      
    </div>
   
  </div>):(<Loader/>)}
  <div className="reviewContainer">
  
      <div className="reviewContainerleft" >
      
      {productDetail.allReviews.map((el)=>(<>
        <div className="reviewContainerleftOne" >
        <ReactStars
          {...{
            edit: false,
            color: "rgba(20,20,20,0.1",
            activeColor: "tomato",
            size: window.innerWidth < 600 ? 20 : 25,
            value: el.rating,
            isHalf: true,
          }}
        />
        <p style={{margin:0,padding:0}} >message : {el.comment}</p>
        <p style={{margin:0,padding:0}} >name : {el.creater.name}</p>
        <p style={{margin:0,padding:0}} >email : {el.creater.email}</p>
        </div>
      </>))}
     
      
      
        
      </div>
      <div className="reviewContainerright" >
        <BasicRating/>
        <textarea style={{width:"25vw",height:"10vw"}} onChange={(e)=>{
          setReview(e.target.value);
        }} ></textarea>
        making review.........
        <Link style={{ textDecoration: "none" }} to={user ? "/productDetail" : "/login"}>
        <button type="button" class="btn btn-primary" onClick={()=>{
          if(productDetail.userRating === 0){
            alert("please give rating to product")
          }else if(review.trim().length ===0){
            alert("please add some words about product")
          }else if(user){
            axios.patch(`${env.BASE_URL}/product/${id}`,{
              comment:review,
              rating:productDetail.userRating
            })
            .then(({data})=>{
              alert("review created")
             // console.log(data)
            })
            .catch((err)=>{console.log(err)})
          }
          
        }} >Review</button></Link>
      </div>
    </div>
    </>
  );
};
