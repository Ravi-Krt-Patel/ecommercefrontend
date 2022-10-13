const init = {
	name:"",
	Nprice:"",
	Oprice:"",
	rating:"",
	discount:"",
	numOfReviews:"",
	stock:"",
	similarProduct:[],
  status:false
};

export const ProductDetailReducer = (store = init, { type, payload }) => {
  switch (type) {
    case "ADD_PRODUCT_DETAIL":
      return { ...store,name:payload.product.ProductName,
	  Nprice:payload.product.newPrice,
	  Oprice:payload.product.oldPrice,
	  rating:payload.product.rating,
	  discount:payload.product.discount,
	  numOfReviews:payload.product.numOfReviews,
	  stock:payload.product.stock,
	  similarProduct:[...payload.Similerproduct],
	status:true};
    default:
      return store;
  }
};