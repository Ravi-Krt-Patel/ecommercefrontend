import {Link} from "react-router-dom";
import "./home.css";
import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import env from "react-dotenv";
import axios from "axios";
import {useSelector,useDispatch} from "react-redux";
import {selectedAddress} from "../redux/action/getDataAction"

export const PaymentMethod =()=>{
	
	const dispatch = useDispatch();

	const {addressId} = useParams();
	

	useEffect(() => {
		getAddress()
	},[])


	function getAddress() {
		axios
		  .get(`${env.BASE_URL}/shipping/user/address/me/${addressId}`)
		  .then(({ data }) => {
		    //console.log(data)
			dispatch(selectedAddress(data))

		  })
		  .catch((err) => {
			console.log(err);
		  });
	  }




	return (<>
	<div  className="CartContainerDiv" >
		<Link to="/payment" style={{ textDecoration: "none" }} >
		   <h2> 	&#10003;  cash on dilivery</h2>
		</Link>
		<h2>Pay with Debit/Credit cart</h2>
		<h2>Net Banking</h2>
		<h2>Net Banking</h2>
		<h2>EMI</h2>
	</div>
	</>)
}