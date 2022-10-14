import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUserAddress,selectedAddress } from "../redux/action/getDataAction";
import axios from "axios";
import env from "react-dotenv";
import "./home.css";
import { Link } from "react-router-dom";




export const AllUsrAddress = () => {

  const dispatch = useDispatch();
  const address = useSelector((store) => store.AddressDataReducer);

  useEffect(() => {
    getAddress();
  }, []);

  function getAddress() {
    axios
      .get(`${env.BASE_URL}/shipping/user/address/me`)
      .then(({ data }) => {
       // console.log(data)
        dispatch(addUserAddress(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }



  // dispatch(selectedAddress(el));

  return (
    <>
      {address.AddressData.length !== 0 ? (
        <div>
			{address.AddressData.map((el,key)=>(<Link to={`/paymentMethod/${el._id}`} style={{ textDecoration: "none" }} ><div className="CartContainerDiv">
				<p style={{margin:0,padding:0}} >address : {el.location}</p>
				<p style={{margin:0,padding:0}} >contact : {el.contact}</p>
				<p style={{margin:0,padding:0}} >pincode : {el.pincode}</p>
				<p style={{margin:0,padding:0}} >city : {el.dist}</p>
				<p style={{margin:0,padding:0}} >state : {el.state}</p>
				<p style={{margin:0,padding:0}} >landmark : {el.landmark}</p>
			</div></Link>))}
		</div>
      ) : (
        <div className="CartContainerDiv">
          There is no address please add a addres for shipping
        </div>
      )}
      <Link to="/diliveryAddress" style={{ textDecoration: "none" }}>
        <div style={{ width: "15vw", margin: "1vw auto" }}>
          <button type="button" class="btn btn-warning">
            + add new address
          </button>
        </div>
      </Link>
    </>
  );
};
