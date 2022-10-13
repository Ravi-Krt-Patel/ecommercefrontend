import { useState, useEffect } from "react";
import axios from "axios";
import env from "react-dotenv";
import {useSelector, useDispatch} from "react-redux";
import {addUserAddress,newAddressAdded} from "../redux/action/getDataAction";
import {AllUsrAddress} from "./AllUserAddress";



export const DiliveryAddress = () => {
  const dispatch = useDispatch();
  const address = useSelector(store=>store.AddressDataReducer)
  const [formData, setFormData] = useState({
    contact: "",
    pincode: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
  });
  console.log(address)
  const handleChange=(e)=>{
    const {name,value} = e.target;
    setFormData({...formData,
    [name]: value});
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    //console.log(formData);
    axios
        .post(`${env.BASE_URL}/shipping/user/address`, {
          landmark:formData.landmark,
          pincode:formData.pincode,
          dist:formData.city,
          location:formData.address,
          state:formData.state,
          contact:formData.contact
        }).then(({data})=>{
          dispatch(newAddressAdded())
        }).catch((err)=>{console.log(err);})
  }


  return (
    <>
    {address.addingStatus?(<AllUsrAddress/>):(
      <div style={{ width: "70vw", margin: "2vw auto" }}>
        <h2>Please fill details for dilivery.......</h2>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Contact</label>
            <input onChange={handleChange} name="contact" type="number" className="form-control" id="inputEmail4" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Pincode</label>
            <input onChange={handleChange} name="pincode" type="number" className="form-control" id="inputPassword4" />
          </div>
          <div className="col-6">
            <label className="form-label">Address</label>
            <input
             onChange={handleChange}
            name="address"
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
            />
          </div>
          <div className="col-6">
            <label className="form-label">Landmark</label>
            <input
            onChange={handleChange}
            name="landmark"
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">City</label>
            <input onChange={handleChange} type="text" className="form-control" id="inputCity" name="city" />
          </div>
          <div className="col-md-6">
            <label className="form-label">State</label>
            <select onChange={handleChange} id="inputState" className="form-select" name="state" >
              <option >Uttar Pradesh</option>
              <option>Andhra Pradesh</option>
              <option>Arunachal Pradesh</option>
              <option>Assam</option>
              <option>Bihar</option>
              <option>Chhattisgarh</option>
              <option>Goa</option>
              <option>Gujarat</option>
              <option>Haryana</option>
              <option>Himachal Pradesh</option>
              <option>Jharkhand</option>
              <option>Karnataka</option>
              <option>Kerala</option>
              <option>Madhya Pradesh</option>
              <option>Maharashtra</option>
              <option>Manipur</option>
              <option>Meghalaya</option>
              <option>Mizoram</option>
              <option>Nagaland</option>
              <option>Odisha</option>
              <option>Punjab</option>
              <option>Rajasthan</option>
              <option>Sikkim</option>
              <option>Tamil Nadu</option>
              <option>Telangana</option>
              <option>Tripura</option>
              <option>Uttarakhand</option>
              <option>West Bengal</option>
            </select>
          </div>
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              submit detail
            </button>
          </div>
        </form>
      </div>
    )}
      
    </>
  );
};
