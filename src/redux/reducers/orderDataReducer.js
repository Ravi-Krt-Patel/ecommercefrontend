

const init = {
	OrderData:"",
	loading:false,
    selectedAddress:{}
};

export const OrderDataReducer = (store = init, { type, payload }) => {
  switch (type) {
    case "ADD_ORDER_ITEM":
		return {...store,OrderData:payload};
    default:
      return store;
  }
};