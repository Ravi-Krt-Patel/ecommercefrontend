
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { Register } from "./register";
// import { useDispatch, useSelector } from "react-redux";
// import { addUserDetail } from "../../redux/action/getDataAction";
// import axios from "axios";
// import env from "react-dotenv";



import "../home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import env from "react-dotenv";
import { useDispatch, useSelector } from "react-redux";
import {UserDetail} from "../UserDetails"
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { addUserDetail,addCartDetail,cartDataLoading} from "../../redux/action/getDataAction";













export const UserLogin = () => {
	// const dipatch = useDispatch();
	// const userDetail = useSelector((store) => store.UserDataReducer);
	
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");

	// useEffect(() => {
	// 	// (<Navigate to={userDetail.status?("/userDetail"):("/register")} replace={true} />)
	//   }, [userDetail.status]);

	// function loggingfun (){
	// 	axios.post(`${env.BASE_URL}/user/login`,{
	// 		email:email,
	// 		password:password
	// 	}).then(({data})=>{
	// 		console.log(data)
	// 		dipatch(addUserDetail(data))
	// 		console.log(userDetail)
	// 	}).catch(err=>console.log(err))
	// }

	const dispatch = useDispatch();
	const [text, setText] = useState({
	  Useremail: "",
	  Userpassword: "",
	});
  
	const userDetail = useSelector((store) => store.UserDataReducer);
  
	//console.log(userDetail);
  
	const handleChange = (e) => {
	  const { name, value } = e.target;
	  setText({
		...text,
		[name]: value,
	  });
	};
	const handleSubmit = async (e) => {
	  e.preventDefault();
	  axios
	  .post(`${env.BASE_URL}/user/login`, {
		email: text.Useremail,
		password: text.Userpassword,
	  })
	  .then(({ data }) => {
		dispatch(addUserDetail(data));
		//console.log(data)
		let user = {
			email:data.user.email,
			name:data.user.name,
			id:data.user._id,
			role:data.user.role
		}
		localStorage.setItem("UserDetail",JSON.stringify(user));

		//this is for updating cart
		axios.get(`${env.BASE_URL}/addToCart`).then(({data})=>{
			dispatch(addCartDetail(data));
			//console.log(data)
			dispatch(cartDataLoading(true));
		  })
		  .catch((err)=>{console.log(err);})



	  })
	  .catch((err) => {
		alert(err.response.data.message);
	  });
	  
	};
  
	useEffect(() => {
	//   (<Navigate to={userDetail.status?("/userDetail"):("/register")} replace={true} />)
	}, [userDetail.status]);
  


	const user = JSON.parse(localStorage.getItem("UserDetail"));





  return (
    <>
	
      {/* <div className="LoginContainer">
        <h3>Enter Your Detail</h3>
        <div>
          <input type="email" placeholder="Enter email" value={email} onChange={(e)=>{
			setEmail(e.target.value);
		  }}/>
        </div>
        <div>
          <input type="password" placeholder="Enter password" value={password} onChange={(e)=>{
			setPassword(e.target.value);
		  }}/>
        </div>
        
          <button className="LoginContainerButton" onClick={loggingfun} >login</button>
        
		  <Link to="/register">
          <button className="LoginContainerButton">register</button>
        </Link>
      </div> */}



{user?(<UserDetail/>):(<div className="LoginContainer">
	     <h3>Enter Your Detail</h3>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div>
            <label>Email : </label>
            <input
              onChange={handleChange}
              name="Useremail"
              type="email"
              
             
            />
          </div>
          <div >
            <label >Password : </label>
            <input
              onChange={handleChange}
              name="Userpassword"
              type="password"
            />
          </div>
         

          <div className="col-12">
              <button type="submit" className="btn btn-primary" >
                login
              </button>
          </div>
        </form>
		<Link to="/register">
		<div style={{marginTop:"1vw"}}>
          <button className="btn btn-primary">register</button>
		  </div>
        </Link>
      </div>)}

	  


	  
    </>
  );
};
