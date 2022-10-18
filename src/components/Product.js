import { Link } from "react-router-dom";
import "./home.css";
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import { cartDataLoading, addCartDetail,addOrderItem } from "../redux/action/getDataAction";
import { useState } from "react";
import env from "react-dotenv";
import axios from "axios";
import { UserLogin } from "./login_signup/Login";

const opFun = (el) => {
  return {
    edit: false,
    color: "rgba(20,20,20,0.1",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: el,
    isHalf: true,
  };
};

export const Product = ({ product }) => {
  const Udetail = useSelector((store) => store.UserDataReducer);
  const dispatch = useDispatch();

  // console.log(product.Id,"coming from product")
  function addToCart() {
    axios.get(`${env.BASE_URL}/addToCart`).then(({data})=>{
      let check = false;
      let qt = 0;
			data.addtocart.forEach((el)=>{
        if(el.item._id === product.Id){
          check = true;
          qt = el.quantity;
        }
      })
      if(check){
        if (product.stock > qt) {
          axios
            .post(`${env.BASE_URL}/addToCart`, {
              itemId: product.Id,
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
              itemId: product.Id,
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

  const user = JSON.parse(localStorage.getItem("UserDetail"));

  return (
    <div>
      {/* <Link to={`/product/${product.Id}`} style={{ textDecoration: "none" }}> */}
      <Link style={{ textDecoration: "none" }} to={user!==null?(user.role==="admin"?(`/admin/AdminPanal/ProductEdit/${product.Id}`):(`/product/${product.Id}`)):(`/product/${product.Id}`)} >
        <div className="productCart">
          <div className="productCartImg" >
          <img src={product.image} alt={product.name} />
          </div>
          
          <p>{product.name}</p>
          <div style={{margin:"0",padding:"0"}} >
            <ReactStars {...opFun(product.rating)} />
            <span style={{margin:"0",padding:"0"}} >Reviews({product.reveiws})</span>
          </div>
          <span style={{margin:"0",padding:"0"}} > 
            {"₹ "+ product.Newprice}
            {product.discount !== 0 ? "  (" + product.discount + "%off )" : ""}
          </span>
          <span style={{margin:"0",padding:"0"}} >
            <s>{product.discount !== 0 ?"₹ " + product.Oldprice : ""}</s>
          </span>
          <span style={{margin:"0",padding:"0"}} >Stock : {product.stock}</span>
          {product.stock !==0?(
            <div>
              <Link style={{ textDecoration: "none" }} to={user ? "/" : "/login"}>
            <button
              onClick={() => {
                if (user) {
                  addToCart();
                }
              }}
              type="button"
              className={
                product.stock < 1
                  ? "btn btn-primary btn-sm disabled"
                  : "btn btn-primary btn-sm"
              }
            >
              Add to Cart
            </button>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            to={user ? "/allUserAddress" : "/login"}
            
          >
            <button
            onClick={()=>{
              product.quantity=1;
              //console.log(product,"we are checking")
              dispatch(addOrderItem([product]));
            }}
              type="button"
              className={
                product.stock < 1
                  ? "btn btn-warning btn-sm disabled"
                  : "btn btn-warning btn-sm"
              }
            >
              Order Now
            </button>
          </Link>
            </div>
          ):(
            <div>
             
            <button
             disabled
              
              type="button"
              className={
                product.stock < 1
                  ? "btn btn-primary btn-sm disabled"
                  : "btn btn-primary btn-sm"
              }
            >
              Add to Cart
            </button>
        
          
            <button
            disabled
            
              type="button"
              className={
                product.stock < 1
                  ? "btn btn-warning btn-sm disabled"
                  : "btn btn-warning btn-sm"
              }
            >
              Order Now
            </button>
        
            </div>
          )}
          
        </div>
      </Link>
    </div>
  );
};
