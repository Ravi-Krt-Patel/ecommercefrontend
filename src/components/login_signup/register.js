import { useState, useEffect } from "react";
import axios from "axios";
import env from "react-dotenv";
import { useDispatch, useSelector } from "react-redux";
import { addUserDetail } from "../../redux/action/getDataAction";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {UserDetail} from "../UserDetails"
export const Register = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState({
    Username: "",
    Useremail: "",
    Userpassword: "",
    UserConfermpassword: "",
  });

  const userDetail = useSelector((store) => store.UserDataReducer);

  console.log(userDetail);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText({
      ...text,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.UserConfermpassword !== text.Userpassword) {
      window.alert(
        "your password and confirmPassword are not same please check it"
      );
    } else {
      axios
        .post(`${env.BASE_URL}/user/register`, {
          name: text.Username,
          email: text.Useremail,
          password: text.Userpassword,
        })
        .then(({ data }) => {
          dispatch(addUserDetail(data));
          let user = {
            email:data.user.email,
			      name:data.user.name,
			      id:data.user._id,
			      role:data.user.role
          }
          localStorage.setItem("UserDetail",JSON.stringify(user))
        })
        .catch((err) => {
          if(err.response.data.message !== undefined){
            alert(err.response.data.message);
          }else{
            err.response.data.errors.map((e)=>{
              alert(e.msg);
            })
          }
          
          console.log(err)
        });
    }
  };

  useEffect(() => {
    (<Navigate to={userDetail.status?("/userDetail"):("/register")} replace={true} />)
  }, [userDetail.status]);


  const user = JSON.parse(localStorage.getItem("UserDetail"));

  return (
    <>
    {user?(<UserDetail/>):(<div style={{ width: "70vw", margin: "2vw auto" }}>
        <h2>Please fill your detail here.....</h2>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              onChange={handleChange}
              name="Username"
              type="text"
              className="form-control"
              id="inputEmail4"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              onChange={handleChange}
              name="Useremail"
              type="email"
              className="form-control"
              id="inputPassword4"
            />
          </div>
          <div className="col-6">
            <label className="form-label">Password</label>
            <input
              onChange={handleChange}
              name="Userpassword"
              type="password"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
            />
          </div>
          <div className="col-6">
            <label className="form-label">Confirm Password</label>
            <input
              onChange={handleChange}
              name="UserConfermpassword"
              type="password"
              className="form-control"
              id="inputAddress2"
              placeholder="1234 Main St"
            />
          </div>
          {/* <div className="col-md-12">
          <label  className="form-label">
            Image
          </label>
          <input type="file" className="form-control" id="inputCity" 
          />
        </div> */}

          <div className="col-12">
              <button type="submit" className="btn btn-primary"  >
                register
              </button>
          </div>
        </form>
      </div>)}
      
    </>
  );
};
