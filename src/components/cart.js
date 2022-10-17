import ReactStars from "react-rating-stars-component";
import { addCartDetail, cartDataLoading } from "../redux/action/getDataAction";
import "./home.css";
import axios from "axios";
import env from "react-dotenv";
import { useSelector, useDispatch } from "react-redux";

export const Cart = ({ cart }) => {
  const dispatch = useDispatch();
  const CartData = useSelector((store) => store.CartDataReducer);

  // function removeItem (id){
  // 	axios.delete(`${env.BASE_URL}/addToCart`,{
  // 		itemId:id
  // 	}).then(({data})=>{
  // 		console.log(data)
  // 		alert("item removed")
  // 	})
  // 	.catch((err)=>{console.log(err);})
  // }

  function addtocart(id, stock, quantity) {
    if (stock > quantity) {
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
  }

  function removeFromCart(cartId) {
    axios
      .patch(`${env.BASE_URL}/addToCart/${cartId}`)
      .then(({ data }) => {
        //console.log(data);
        alert("item is removed from cart");

        //when item get removed
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

  function deleteFromCart(cartId) {
    axios
      .delete(`${env.BASE_URL}/addToCart/${cartId}`)
      .then(({ data }) => {
       // console.log(data);
        alert("item is deleted from cart");
        //when item get deleted
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
  

  return (
    <>
      <div className="CartContainer">
        <div className="CartContainerC1">
          <div>
            <img src={cart.image} />
          </div>
          {cart.stock !== 0?(<div>
          <button
            type="button"
            class="btn btn-warning"
            onClick={() => {
              removeFromCart(cart.cartId);
            }}
            >
            -
            </button>
            <span style={{margin:"1vw",fontWeight:"bold"}} >{cart.OrderQuntity}</span>
            <button
            type="button"
            class="btn btn-warning"
            onClick={() => {
              addtocart(cart.id, cart.stock, cart.OrderQuntity);
            }}
            >
            +
            </button>
          </div>):(<div>Out of Stock</div>)}
          
            
        </div>
        <div className="CartContainerC2">
          <h4>{cart.name}</h4>
          <ReactStars
            {...{
              edit: false,
              color: "rgba(20,20,20,0.1",
              activeColor: "tomato",
              size: window.innerWidth < 600 ? 20 : 25,
              value: cart.rating,
              isHalf: true,
            }}
          />
          <p>price - {cart.price}</p>
          {/* <p>stock : {cart.stock}</p> */}
          <button
            type="button"
            class="btn btn-warning"
            onClick={() => {
              deleteFromCart(cart.cartId);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
