import { useSelector, useDispatch } from "react-redux";
import { addCartDetail, cartDataLoading,addOrderItem} from "../redux/action/getDataAction";
import { Cart } from "./cart";
import env from "react-dotenv";
import { useState, useEffect, memo } from "react";
import axios from "axios";
import { Loader } from "./loading";
import { UserLogin } from "./login_signup/Login";
import {Link} from "react-router-dom";
import "./home.css";

const AddCart = () => {
  const data = useSelector((store) => store.homePageReducer);
  const CartData = useSelector((store) => store.CartDataReducer);
  const UserDetail = useSelector((store) => store.UserDataReducer);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("UserDetail"));
  // console.log(CartData);

  useEffect(() => {
    if (user) {
      getCartData();
    }
  }, [CartData.CartData.length, CartData.CartData.loading]);

  function getCartData() {
    axios
      .get(`${env.BASE_URL}/addToCart`)
      .then(({ data }) => {
        dispatch(addCartDetail(data));
        //console.log(data);
        dispatch(cartDataLoading(true));
        let orderData = [];
        data.addtocart.forEach((el)=>{
          el.item.quantity=el.quantity;
          el.item.name = el.item.ProductName;
          el.item.Newprice = el.item.newPrice;
          el.item.image = el.item.image[0];
          el.item.Id = el.item._id;
          el.item.cartId = el._id;
          if(el.item.stock !==0 && el.quantity <= el.item.stock){
            orderData.push(el.item);
          }
        })

        //this is for making order
        dispatch(addOrderItem(orderData));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //console.log(CartData.CartData,"working")
  //console.log(CartData.CartData)

  return (
    <>
      {user ? (
        <div>
          {CartData.loading ? (
            <div>
              {CartData.CartData.length !== 0 ? (
                <div>
                  <Link to="/allUserAddress" style={{ textDecoration: "none" }} ><button className="CartContainerDiv">Proced to Buy</button></Link>
                  {CartData.CartData.map((e) => (
                    <Cart
                      cart={{
                        name: e.item.ProductName,
                        image: e.item.image,
                        rating: e.item.rating,
                        id: e.item._id,
                        stock: e.item.stock,
                        OrderQuntity: e.quantity,
                        cartId: e._id,
                        price:e.item.newPrice
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  <div className="CartContainerDiv">
                    <h1>No Item in the Cart Please Add some Item to cart</h1>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <Loader />
            </div>
          )}
        </div>
      ) : (
        <UserLogin />
      )}
    </>
  );
};

export default memo(AddCart);
