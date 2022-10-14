import {useState, useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import env from "react-dotenv";
import axios from "axios";

export const UserOrderDetail = ()=>{
	useEffect(()=>{
		axios.get(`${env.BASE_URL}/orderProduct/user/orders`).then(({data})=>{
			console.log(data)
		})
		.catch((err)=>{console.log(err);})
	},[])

	return (<>
	<div>
		working superb
	</div>
	</>)
}