import {Link} from "react-router-dom";
import "./home.css";

export const PaymentMethod =()=>{

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