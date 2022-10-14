import Home from "./components/home"
import {useSelector,useDispatch} from "react-redux";
import {INC_COUNT} from "./redux/action/action";
import {useState,useEffect} from "react";
import {getAllData} from "./redux/action/getDataAction";
import {getDataLoading,getDataSucces} from "./redux/action/getDataAction";
import {ProductDetail} from "./components/ProDetail/productDetail";
import {DiliveryAddress} from "./components/diliveryAddress";
import {Loader} from "./components/loading";
import {Register} from "./components/login_signup/register";
import {Error} from "./components/error";
import {Navbar} from "./components/Navbar";
import {Cart} from "./components/cart";
import AddCart from "./components/AddCart";
import {UserDetail} from "./components/UserDetails";
import axios from "axios";
import {UserLogin} from "./components/login_signup/Login"
import {AllUsrAddress} from "./components/AllUserAddress";
import {Route,Routes} from "react-router-dom";
import {Payment} from "./components/payment";
import {PaymentMethod} from "./components/paymentMethod";
import {UserOrderDetail} from "./components/UserOrderDetail";
import {ProductMake} from "./components/admin/ProductMake"
import {AdminPanal} from "./components/admin/AdminPanal";
import {ProductEdit} from "./components/admin/productEdit";

function App() {
  return (<>
  <Navbar />
  <Routes>
    <Route path="/" element={<Home/>} ></Route>
    <Route path="/login" element={<UserLogin/>}></Route>
    <Route path="/product/:id" element={<ProductDetail/>} ></Route>
    <Route path="/userDetail" element={<UserDetail/>}></Route>
    <Route path="/register" element={<Register/>} ></Route>
    <Route path="/cart" element={<AddCart/>} ></Route>
    <Route path="/payment" element={<Payment/>} ></Route>
   
    <Route path="/paymentMethod/:addressId" element={<PaymentMethod/>} ></Route>
    <Route path="/productDetail" element={<ProductDetail/>} ></Route>
    <Route path="/diliveryAddress" element={<DiliveryAddress/>} ></Route>
    <Route path="/allUserAddress" element={<AllUsrAddress/>} ></Route>
    <Route path="/admin/AdminPanal" element={<AdminPanal/>} ></Route>
    <Route path="/admin/AdminPanal/ProductMake" element={<ProductMake/>} ></Route>
    <Route path="/admin/AdminPanal/ProductEdit/:id" element={<ProductEdit/>} ></Route>
    <Route path="/admin/UserOrderDetail" element={<UserOrderDetail/>} ></Route>
  </Routes>
    </>
  );
}

export default App;


