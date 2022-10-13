import "./home.css"
import {useSelector,useDispatch} from "react-redux";
import {removeUserLogout,cartDataRemove} from "../redux/action/getDataAction";
import axios from "axios";
import {Link,useParams} from "react-router-dom";
import env from "react-dotenv";
export const UserDetail = ()=>{
	const dispatch = useDispatch();
	const UserDetail = useSelector(store=>store.UserDataReducer)
	const {id} = useParams();

	function loggingOut(){
		axios
	  .get(`${env.BASE_URL}/user/logout`)
	  .then(({data})=>{
		dispatch(removeUserLogout());
		dispatch(cartDataRemove());
		localStorage.removeItem("UserDetail");
	})
	  
	  .catch(err=>{alert(err.message)})
	}
	const user = JSON.parse(localStorage.getItem("UserDetail"));
	

	return (<>
	<div className="UserDetailContainer">
		<div>
		<h3><span>UserEmail:</span> {user.email}</h3>
		<h3><span>UserName:</span> {user.name}</h3>
		<h3><span>Role :</span>{user.role}</h3>
		</div>
		<div>
			<button className="UserDetailContainerButton">Orders</button>
			<Link to="/" >
			<button className="UserDetailContainerButton" onClick={loggingOut} >logout</button>
			</Link>
			
		</div>
	</div>
	</>)
}