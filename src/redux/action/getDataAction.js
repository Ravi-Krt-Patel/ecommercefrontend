
import axios from "axios";
import {useSelector,useDispatch} from "react-redux";
import {homePageReducer} from "../reducers/getDataReducer"



export const getDataSucces = (payload)=> ({
	type:"GET_DATA",
	payload
});

export const getDataLoading = ()=>({
	type:"GET_DATA_LOADING"
});

export const getHomeDataLoading= ()=>({
	type:"GET_HOME_LOADING"
});

export const getHomeData = (payload)=>({
	type:"GET_HOME_DATA",
	payload
});

export const pageUpdate = (payload)=>({
	type:"PAGE_UPDATE",
	payload
});

export const addSearchText = (payload)=>({
	type:"ADD_SEARCH_TEXT",
	payload
});

export const addBrand = (payload)=>({
	type:"ADD_BRAND",
	payload
})

export const removeBrand = (payload)=>({
	type:"REMOVE_BRAND",
	payload
})

export const addPriceRang = (payload)=>({
	type:"ADD_PRICE_RANG",
	payload
})

export const addDiscount =(payload)=>({
	type:"ADD_DISCOUNT_RANG",
	payload
})

export const addRating = (payload)=>({
	type:"ADD_RATING",
	payload
})

export const removeRating = (payload)=>({
	type:"REMOVE_RATING",
	payload
})

export const addCategory =(payload)=>({
	type:"ADD_CATEGORY",
	payload
})

export const addSearchCategory =(payload)=>({
	type:"ADD_SEARCH_CATEGORY",
	payload
})

export const removeCategory =()=>({
	type:"ADD_CATEGORY"
})



//user data action start from here ----------------

export const addUserDetail = (payload)=>({
	type:"ADD_USER_DETAIL",
	payload
})

export const addUserLogin =(payload)=>({
	type:"ADD_USER_LOGIN",
	payload
})

export const removeUserLogout =()=>({
	type:"REMOVE_USER_LOGOUT",
})


//cart data action start from here--------------------

export const addCartDetail = (payload)=>({
	type:"ADD_CART_DETAIL",
	payload
})

export const cartDataLoading = (payload)=>({
	type:"CART_DATA_LOADING",
	payload
});

export const cartDataRemove = ()=>({
	type:"CART_DATA_REMOVE"
})




//sigle product detail ----------------------------------

export const addProductDetail = (payload)=>({
	type:"ADD_PRODUCT_DETAIL",
	payload
})

export const removeProductDetail = ()=>({
	type:"REMOVE_PRODUCT_DETAIL"
})

export const addRatingProductDetail = (payload)=>({
	type:"ADD_RATING_PRODUCT_DETAIL",
	payload
})

export const addAllReviews = (payload)=>({
	type:"ADD_ALL_REVIEWS",
	payload
})

//user address detail-------------
export const addUserAddress = (payload)=>({
	type:"ADD_USER_ADDRESS",
	payload
})

export const newAddressAdded=()=>({
	type:"NEW_ADDRESS_ADDED"
})

export const selectedAddress =(payload)=>({
	type:"SELECTED_ADDRESS",
	payload
})



// user order details
export const addOrderItem=(payload)=>({
	type:"ADD_ORDER_ITEM",
	payload
})

export const addOrderedItems = (payload)=>({
	type:"ADD_ORDERED_ITEMS",
	payload
})

// export const setHomeData =()=>{
// 	const reduxData = useSelector((store)=>store.homePageReducer)
// 	return(<>
// 	</>)
// }