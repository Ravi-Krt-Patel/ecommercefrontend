import { Avatar } from "@mui/material";
import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import { addSearchText } from "../redux/action/getDataAction";
import { useState,useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {addCartDetail,cartDataLoading} from "../redux/action/getDataAction"
import {UserDetail} from "./UserDetails";



export const Navbar = () => {

const Userdata = useSelector(store=>store.UserDataReducer);
const CartData = useSelector(store=>store.CartDataReducer);
//console.log(Userdata);

  const dispatch = useDispatch();
  const [text, setText] = useState("");
  
  const submitChange = (e) => {
    e.preventDefault();
    dispatch(addSearchText(text));
    console.log(text);
  };

  useEffect(()=>{

  },[Userdata,CartData.CartData])

  



  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <Link to ="/">
                Home
          </Link>
          {/* <a className="navbar-brand">
            
          </a> */}

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form className="d-flex me-3" onSubmit={submitChange}>
              <input
                className="form-control me-2"
                type="search"
                value={text}
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <button className="btn btn-outline-success me-5" type="submit">
                Search
              </button>
            </form>
            <Link to="/cart">
            <button
              type="button"
              className="btn btn-primary position-relative ms-5 me-5"
            >
              Cart
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {CartData.CartData.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
            </Link>
            
            {localStorage.getItem("UserDetail") ? (
              <Link to="/userDetail" >
              <Avatar
                alt="Remy Sharp"
                src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/TVs/Jup22/Kamya/MiRedmi/R01_PC_CategoryCard_758X608._SY304_CB608210661_.jpg"
              />
              </Link>
              
            ) : (
              <Link to="/login" >
                <Avatar src="/broken-image.jpg" />
                </Link>
            )}
            <div className="ms-5"></div>
          </div>
        </div>
      </nav>

      {/* //bottom nav bar----------------------------------- */}
    </>
  );
};
