
import {useState,useEffect} from "react";
import axios from "axios";
import env from "react-dotenv";
import {useSelector, useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import {addProductDetail,removeProductDetail} from "../../redux/action/getDataAction";



export const ProductEdit = ()=>{

  const dispatch = useDispatch();
  const { id } = useParams();
  const productDetail = useSelector(store=>store.ProductDetailReducer);
  console.log(productDetail);
  const [cond, setCond] = useState(true);
	const[formData, setFormData] = useState({
		ProductName:"",
		Description:"",
		oldPrice:"",
		newPrice:"",
		brand:"",
		category:"",
		stock:"",
	})

	function handleChange(e){
		e.preventDefault();
		const {name,value} = e.target;
		setFormData({...formData,
			[name]:value});
		
	}


	function handleSubmit(e){
		e.preventDefault();

    if(formData.ProductName.trim().length===0){
      formData.ProductName=productDetail.name;
    }
    if(formData.Description.trim().length===0){
      formData.Description = productDetail.description;
    }
    if(formData.oldPrice.trim().length===0){
      formData.oldPrice = productDetail.Oprice;
    }
    if(formData.newPrice.trim().length===0){
      formData.newPrice = productDetail.Nprice;
    }
    if(formData.brand.trim().length===0){
      formData.brand = productDetail.brand;
    }
    if(formData.category.trim().length===0){
      formData.category = productDetail.category;
    }
    if(formData.stock.trim().length===0){
      formData.stock = productDetail.stock;
    }

    axios
	  .patch(`${env.BASE_URL}/product/${id}`, {
		ProductName:formData.ProductName,
		Description:formData.Description,
		brand:formData.brand,
		oldPrice:formData.oldPrice,
		newPrice:formData.newPrice,
		category:formData.category,
		stock:formData.stock
	  })
	  .then(({data})=>{
      alert("product is updated successfully")
		console.log(data)
	  })
	  .catch((err)=>{console.log(err);})

    dispatch(removeProductDetail());
    setFormData({
      ProductName:"",
      Description:"",
      oldPrice:"",
      newPrice:"",
      brand:"",
      category:"",
      stock:"",
    })
    setCond(false);

	}


  useEffect(() => {
    if(cond){
      getProductDetail();
    }
    
  },[cond])

  function getProductDetail() {
    axios
      .get(`${env.BASE_URL}/product/${id}`)
      .then(({ data }) => {
        //console.log(data,"this is product detail edit")
        dispatch(addProductDetail(data))
      })
      .catch((err) => {
        console.log(err);
      });
  }




	return (<>
	<div style={{margin:"2vw"}}>
	<h2>Edit the product.....</h2>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">ProductName</label>
            <input
              onChange={handleChange}
              name="ProductName"
              type="text"
              className="form-control"
              id="inputEmail4"
              defaultValue={productDetail.name}
			 
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
              defaultValue={productDetail.description}
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
              defaultValue={productDetail.Oprice}
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
              defaultValue={productDetail.Nprice}
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
              defaultValue={productDetail.brand}
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
              defaultValue={productDetail.category}
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
              defaultValue={productDetail.stock}
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
                Edit Product
              </button>
          </div>
        </form>
		</div>
	</>)
}