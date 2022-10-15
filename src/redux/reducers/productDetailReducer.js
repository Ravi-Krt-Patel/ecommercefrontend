const init = {
	name:"",
	Nprice:"",
	Oprice:"",
	rating:"",
	discount:"",
	numOfReviews:"",
	stock:"",
	similarProduct:[],
	productId:"",
	description:"",
	brand:"",
	category:"",
	image:[],
	userRating:"",
    status:false,
	allReviews:[]
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
	  productId:payload.product._id,
	  description:payload.product.Description,
	  brand:payload.product.brand,
	  category:payload.product.category,
	  similarProduct:[...payload.Similerproduct],
	  image:[...payload.product.image],
	  status:true};
	case "REMOVE_PRODUCT_DETAIL":
		return {...store,name:"",
			Nprice:"",
			Oprice:"",
			rating:"",
			discount:"",
			numOfReviews:"",
			stock:"",
			productId:"",
			description:"",
			brand:"",
			category:"",
			similarProduct:[],
			status:true}
	case "ADD_RATING_PRODUCT_DETAIL":
		return {...store,userRating:payload}
	case "ADD_ALL_REVIEWS":
		return {...store,allReviews:[...payload.review]}
    default:
      return store;
  }
};