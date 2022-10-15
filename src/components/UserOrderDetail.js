import {useState, useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {addOrderedItems} from "../redux/action/getDataAction";
import env from "react-dotenv";
import axios from "axios";

export const UserOrderDetail = ()=>{
	const dispatch = useDispatch();
	const [order,setOrder] = useState(0);
	const OrderedItems = useSelector((store=>store.OrderDataReducer));

	console.log(OrderedItems,"this is order item")

	useEffect(()=>{
		getOrderedData();
	},[OrderedItems.allOrderedItems.length,order])


	function getOrderedData(){
		axios.get(`${env.BASE_URL}/orderProduct/user/orders`).then(({data})=>{
			//console.log(data,"order of user....")
			dispatch(addOrderedItems(data.order))
		})
		.catch((err)=>{console.log(err);})
	}


	function cancelOrder(id){
		axios.delete(`${env.BASE_URL}/orderProduct/user/orders/${id}`).then(({data})=>{
			//console.log(data,"order of user....")
			alert("this Order is cancelled successfully");
		})
		.catch((err)=>{console.log(err);})
	}


	console.log(OrderedItems.allOrderedItems)
	return (<>
	{OrderedItems.allOrderedItems.length !==0?(<div>
		{OrderedItems.allOrderedItems.map((el,key)=>(<>
		<div className="OrderedItem" >
			<div className="OrderedItemleft" >
			<img style={{width: "100%"}} src={el.orderedItems.product.image[0]} />
			</div>
			<div className="OrderedItemright" >
				<p style={{padding: "0", margin: "0" }} >{el.orderedItems.product.ProductName}</p>
				<p style={{padding: "0", margin: "0" }} >Price : {el.orderedItems.product.newPrice}</p>
				<p style={{padding: "0", margin: "0" }}>Quantity : {el.orderedItems.quantity}</p>
				<p style={{padding: "0", margin: "0" }}>dilivery Status :<b style={{color: 'green'}} > {el.diliveryStatus}</b></p>
				<p style={{padding: "0", margin: "0" }}> total Price : {el.orderedItems.orderAmount}</p>
				<button type="button" class="btn btn-danger mt-3" onClick={()=>{
					cancelOrder(el._id)
					setOrder((e)=>e+1);
				}} >Cancel</button>
			</div>
			
		</div>
		</>))}
		
	</div>):(
		<div className="PaymentContainerDivAdmin" >Please Order some Item</div>
	)}
	
	</>)
}