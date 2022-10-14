import { useSelector, useDispatch } from "react-redux";
import "./home.css";
import { useState, useEffect } from "react";
import env from "react-dotenv";
import axios from "axios";
import {addCartDetail,cartDataLoading} from "../redux/action/getDataAction";



export const Payment = () => {
  const dispatch = useDispatch();
  const address = useSelector((store) => store.AddressDataReducer);
  const order = useSelector((store) => store.OrderDataReducer);



  // console.log(order,"this is for making order only");
  console.log(address,"this is for making address only");

  const [orderPrice, setOrderPrice] = useState({
    totalPrice: 0,
    shippingPrice: 0,
  });
 
  
  //console.log(order);

  useEffect(() => {
    Amount();
  }, []);

  console.log("total price");


  function Amount(){
    let total = 0;
    order.OrderData.forEach((el) => {
      total += Number(el.Newprice) * Number(el.quantity);
      
    });
    if (total < 1000) {
      setOrderPrice({ ...orderPrice, shippingPrice: 80, totalPrice: total });
    } else {
      setOrderPrice({ ...orderPrice, totalPrice: total, shippingPrice: 0 });
    }
   
   
  }



  function deleteFromCart(cartId) {
    axios
      .delete(`${env.BASE_URL}/addToCart/${cartId}`)
      .then(({ data }) => {
        //console.log(data);
       // alert("item is deleted from cart");
        //when item get deleted
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

  // console.log(orderPrice);

  function placeOrder() {
    let orderedItems = [];
    order.OrderData.forEach((el) => {
      let obj = {};
      obj.product = el.Id;
      obj.quantity = el.quantity;
      orderedItems.push(obj);
    });
    let buyerAdress = address.selectedAddress.shippingAddress._id;
    let orderAmount =order.totalAmt() ;
    let paymentMethod = "Cash on dilivery";
    let paymentStatus = "unpaid";

    axios
      .post(`${env.BASE_URL}/orderProduct/product/orders`, {
        orderedItems: orderedItems,
        buyerAdress: buyerAdress,
        orderAmount: orderAmount,
        paymentMethod: paymentMethod,
        paymentStatus: paymentStatus,
      })
      .then(({ data }) => {
		console.log(data)
        alert("order is placed successfully");
		order.OrderData.forEach((el)=>{
			deleteFromCart(el.cartId);
		})
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="PaymentContainerDiv">
        <div>
          {order.OrderData.map((el) => (
            <div>
              <div className="PaymentContainerDivLeft">
                <div style={{ marginRight: "2vw" }}>
                  <img style={{ width: "10vw" }} src={el.image} />
                </div>
                <div>
                  <p style={{ padding: "0", margin: "0" }}>{el.name}</p>
                  <p style={{ padding: "0", margin: "0" }}>
                    quantity : {el.quantity}
                  </p>
                  <p style={{ padding: "0", margin: "0" }}>
                    price : ₹ {el.Newprice}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="PaymentContainerDivrigth">
          <h4>Address</h4>
          <p>
            contact : {address.selectedAddress.contact}, city:{" "}
            {address.selectedAddress.dist}, landmark:{" "}
            {address.selectedAddress.landmark}, location:{" "}
            {address.selectedAddress.location},pincode:{" "}
            {address.selectedAddress.pincode}, state:{" "}
            {address.selectedAddress.pincode}
          </p>

          <h5>Products Amnount : ₹ {orderPrice.totalPrice}</h5>
          <h5>Shipping Amount : ₹ {orderPrice.shippingPrice}</h5>
          <h5>
            Total Amount : ₹ {orderPrice.shippingPrice + orderPrice.totalPrice}
          </h5>
          {/* <h2>Total Amnount : {orderPrice.grossPrice}</h2> */}
          <div class="d-grid gap-2 mt-5">
            <button class="btn btn-success" type="button" onClick={placeOrder} >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
