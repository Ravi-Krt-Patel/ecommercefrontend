const init = {
	CartData:[],
	loading:false
};

export const CartDataReducer = (store = init, { type, payload }) => {
  switch (type) {
    case "ADD_CART_DETAIL":
      return {...store,CartData:[...payload.addtocart]};
	case "CART_DATA_LOADING":
		return {...store,loading:payload}
  case "CART_DATA_REMOVE":
    return {...store,CartData:[],
      loading:false}
    default:
      return store;
  }
};
