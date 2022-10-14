import {useState,useEffect} from "react";
import axios from "axios";
import env from "react-dotenv";


export const ProductMake = ()=>{
	const[formData, setFormData] = useState({
		ProductName:"",
		Description:"",
		oldPrice:"",
		newPrice:"",
		brand:"",
		category:"",
		stock:"",
		image1:"",
		image2:"",
		image3:""
	})

	function handleChange(e){
		e.preventDefault();
		const {name,value} = e.target;
		setFormData({...formData,
			[name]:value});
		
	}


	function handleSubmit(e){
		e.preventDefault();
		console.log(formData);
		axios
	  .post(`${env.BASE_URL}/product`, {
		ProductName:formData.ProductName,
		Description:formData.Description,
		brand:formData.brand,
		image:[formData.image1,formData.image2,formData.image3],
		oldPrice:formData.oldPrice,
		newPrice:formData.newPrice,
		category:formData.category,
		stock:formData.stock
	  })
	  .then(({data})=>{
		console.log(data)
    alert("product is created")
	  })
	  .catch((err)=>{console.log(err);})
	}

	return (<>
	<div style={{margin:"2vw"}} >
	<h2>Please fill your detail of product.....</h2>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">ProductName</label>
            <input
              onChange={handleChange}
              name="ProductName"
              type="text"
              className="form-control"
              id="inputEmail4"
			  
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Description</label>
            <input
              onChange={handleChange}
              name="Description"
              type="text"
              className="form-control"
              id="inputPassword4"
            />
          </div>
		  <div className="col-6">
            <label className="form-label">oldPrice</label>
            <input
              onChange={handleChange}
              name="oldPrice"
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="1234 Main St"
            />
          </div>
		  <div className="col-6">
            <label className="form-label">newPrice</label>
            <input
              onChange={handleChange}
              name="newPrice"
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="1234 Main St"
            />
          </div>
          <div className="col-6">
            <label className="form-label">brand</label>
            <input
              onChange={handleChange}
              name="brand"
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
            />
          </div>
          
		  
		  <div className="col-6">
            <label className="form-label">image1</label>
            <input
              onChange={handleChange}
              name="image1"
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="1234 Main St"
            />
          </div>
		  <div className="col-6">
            <label className="form-label">image2</label>
            <input
              onChange={handleChange}
              name="image2"
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="1234 Main St"
            />
          </div>
		  <div className="col-6">
            <label className="form-label">image3</label>
            <input
              onChange={handleChange}
              name="image3"
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="1234 Main St"
            />
          </div>
		  <div className="col-6">
            <label className="form-label">category</label>
            <input
              onChange={handleChange}
              name="category"
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="1234 Main St"
            />
          </div>
		  <div className="col-6">
            <label className="form-label">stock</label>
            <input
              onChange={handleChange}
              name="stock"
              type="text"
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
                Create Product
              </button>
          </div>
        </form>
		</div>
	</>)
}